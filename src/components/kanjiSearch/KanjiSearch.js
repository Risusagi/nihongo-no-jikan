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
    
    // handle search input or selection changes (user's inquiry or mode of search)
    handleChange = (e) => {
        const property = e.currentTarget.type === 'text' ? 'inquiry' : 'searchMode';

        const value = e.currentTarget.value;

        this.setState({
            [property]: value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        if (this.state.searchMode === 'english') {
            // search with english meaning return poor information about kanji (kanji + its radical)
            // returns empty array if nothing was found
            const data = await kanjiAlive.get('/search/advanced', {
                params: {
                    kem: this.state.inquiry
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
                        'Sorry, nothing was found'    
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