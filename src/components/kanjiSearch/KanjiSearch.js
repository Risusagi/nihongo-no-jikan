import React from 'react';
import kanjiAlive from './kanjiAlive';
import KanjiPreview from './KanjiPreview';

class KanjiSearch extends React.Component {
    state = {
        inquiry: '',
        searchMode: 'english',
        results: [],
        noResults: false
    }

    componentDidMount = () => {
        const showResults = sessionStorage.getItem('inquiry') ? true : false;
        
        this.setState({
            inquiry: sessionStorage.getItem('inquiry') || '',
            searchMode: sessionStorage.getItem('mode') || 'english',
            noResults: showResults
        });
    }

    // handle search input or selection changes (user's inquiry or mode of search)
    handleChange = (e) => {
        const property = e.currentTarget.type === 'text' ? 'inquiry' : 'searchMode';

        const value = e.currentTarget.value;

        // save mode in session storage every time it is changed (to not lose it when page would be refreshed)
        if (e.currentTarget.type === 'select-one') sessionStorage.setItem('mode', value);

        this.setState({
            [property]: value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        if (!this.state.inquiry) return;

        sessionStorage.setItem('inquiry', this.state.inquiry.toLowerCase());

        if (this.state.searchMode === 'english') {
            // search with english meaning return poor information about kanji (kanji + its radical)
            // returns empty array if nothing was found
            // kanji alive can't find results if search request wasn't written in lower case
            const data = await kanjiAlive.get('/search/advanced', {
                params: {
                    kem: this.state.inquiry.toLowerCase()
                }
            });
            
            // request for more data about every kanji got previously
            const fullData = await Promise.all(
                data.data.map(async set => {
                    const kanji = await kanjiAlive.get(`/kanji/${set.kanji.character}`);

                    return kanji.data;    
                })
            );
            
            this.renderSearchResults(fullData);

        } else {
            // search by kanji returns full information about one kanji
            // return object with error property that contains message that search wasn't successful
            const data = await kanjiAlive.get(`/kanji/${this.state.inquiry}`);

            this.renderSearchResults([data.data]);
        }
    }

    renderSearchResults = (results) => {
        if (!results.length || results[0].error) {
            this.setState({
                noResults: true
            });
            return;
        }

        // render separated element for every found kanji
        const resultsList = results.map(result => {
            const { kanji, radical, references } = result;
            
            return (
                <KanjiPreview
                    kanji={kanji.character}
                    radical={radical.character}
                    strokes={kanji.strokes.count}
                    meanings={kanji.meaning.english}
                    onyomi={kanji.onyomi.katakana}
                    kunyomi={kanji.kunyomi.hiragana}
                    key={references.kodansha}
                />    
            );
        });

        this.setState({
            results: resultsList,
            noResults: false
        });
    }

    handleReset = () => {
        sessionStorage.setItem('inquiry', '');

        this.setState({
            inquiry: '',
            results: [],
            noResults: false
        });
    }

    render() {
        return (
            <div>
                <form
                    onSubmit={this.handleSubmit}
                >
                    <input
                        type="text"
                        value={this.state.inquiry}
                        onChange={this.handleChange}
                    />

                    <button
                        type="button"
                        onClick={this.handleReset}
                    >
                        Reset
                    </button>

                    <select
                        value={this.state.searchMode}
                        onChange={this.handleChange}
                    >
                        <option value="english">
                            English meaning
                        </option>

                        <option value="kanji">
                            Kanji character
                        </option>
                    </select>

                    <button type="submit">Search</button>
                </form>

                {/* // if nothing was found display message about lack of answers for user's request */}
                <div>
                    {this.state.noResults ? (
                        'Nothing found'    
                        ) : (
                            <ul>
                                {this.state.results}
                            </ul>
                        )
                    }
                </div>
            </div>
        );
    }
};

export default KanjiSearch;