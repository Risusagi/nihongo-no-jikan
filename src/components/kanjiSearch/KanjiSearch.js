import React from 'react';
import { Switch, Route } from 'react-router-dom';
import kanjiAlive from './kanjiAlive';
import KanjiPreview from './KanjiPreview';
import KanjiDetails from './KanjiDetails';

class KanjiSearch extends React.Component {
    state = {
        inquiry: '',
        searchMode: 'english',
        data: [],
        results: [],
        noResults: false
    }

    componentDidMount = () => {
        // set request's textand mode if they were saved previously (before page was rerendered), otherwise set values to initial ones
        this.setState({
            inquiry: sessionStorage.getItem('inquiry') || '',
            searchMode: sessionStorage.getItem('mode') || 'english'
        });

        // render results of the search if they were saved before, set data for KanjiDetails render and set noResults accordingly to results appearance
        this.renderSearchResults(JSON.parse(sessionStorage.getItem('results')) || []);
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

        // save inquiry
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
            if (fullData.length) sessionStorage.setItem('results', JSON.stringify(fullData));

        } else {
            // search by kanji returns full information about one kanji
            // return object with error property that contains message that search wasn't successful
            const data = await kanjiAlive.get(`/kanji/${this.state.inquiry}`);

            this.renderSearchResults([data.data]);
            if(!data.data.error) sessionStorage.setItem('results', JSON.stringify([data.data]));
        }
    }

    renderSearchResults = (results) => {
        // if anything was searched and nothing was found show message that nothing was found
        // check both state and storage as state can be not set yet after page was rerendered
        if ((!results.length || results[0].error) && (this.state.inquiry || sessionStorage.getItem('inquiry'))) {
            sessionStorage.removeItem('results');
            
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
            data: results,
            results: resultsList,
            noResults: false
        });
    }

    handleReset = () => {
        // clear storage to not save inquiry and results of search to not render them if page would be refreshed between the moment of reset and aubmiting form one more time
        sessionStorage.removeItem('inquiry');
        sessionStorage.removeItem('results');

        this.setState({
            inquiry: '',
            results: [],
            noResults: false
        });
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path={`${this.props.match.path}`} exact>
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
                    </Route>

                    <Route path={`${this.props.match.path}/view/:kanji`}>
                        <KanjiDetails
                            allCharacters={this.state.data}
                        />
                    </Route>
                </Switch>
            </div>
        );
    }
};

export default KanjiSearch;