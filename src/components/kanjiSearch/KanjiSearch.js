import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import kanjiAlive from './kanjiAlive';
import KanjiPreview from './KanjiPreview';
import KanjiDetails from './KanjiDetails';
import TitleComponent from '../TitleComponent';
import Modal from '../Modal';

class KanjiSearch extends React.Component {
    signal = axios.CancelToken.source();

    state = {
        inquiry: '',
        searchMode: 'english',
        data: [],
        results: [],
        noResults: false,
        showSpiner: false,
        APIKey: process.env.REACT_APP_KANJIALIVE_KEY || localStorage.getItem('APIKey'),
        usersKey: '',
        displayModal: false
    }

    componentDidMount = () => {
        // set request's textand mode if they were saved previously (before page was rerendered), otherwise set values to initial ones
        this.setState({
            inquiry: sessionStorage.getItem('inquiry') || '',
            searchMode: sessionStorage.getItem('mode') || 'english'
        });

        // render results of the search if they were saved before, set data for KanjiDetails render and set noResults accordingly to results appearance
        this.renderSearchResults(JSON.parse(sessionStorage.getItem('results')) || []);

        window.addEventListener('keydown', this.handleKeyDown);

        // render modal if kanjiAlive key isn't available
        if (!this.state.APIKey) {
            this.setState({
                displayModal: true
            });
        }
    }

    componentWillUnmount = () => {
        // cancel API request
        this.signal.cancel();

        sessionStorage.clear();

        window.removeEventListener('keydown', this.handleKeyDown);
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

        try {
            this.setState({
                showSpiner: true
            });

            if (this.state.searchMode === 'english') {
                // search with english meaning return poor information about kanji (kanji + its radical)
                // returns empty array if nothing was found
                // kanji alive can't find results if search request wasn't written in lower case
                const data = await kanjiAlive(this.state.APIKey).get('/search/advanced', {
                    params: {
                        kem: this.state.inquiry.toLowerCase()
                    },
                    cancelToken: this.signal.token
                });
                
                // request for more data about every kanji got previously
                const fullData = await Promise.all(
                    data.data.map(async set => {
                        const kanji = await kanjiAlive(this.state.APIKey).get(`/kanji/${set.kanji.character}`, {
                            cancelToken: this.signal.token
                        });

                        return kanji.data;    
                    })
                );
                
                this.renderSearchResults(fullData);
                if (fullData.length) sessionStorage.setItem('results', JSON.stringify(fullData));

            } else {
                // search by kanji returns full information about one kanji
                // return object with error property that contains message that search wasn't successful
                const data = await kanjiAlive(this.state.APIKey).get(`/kanji/${this.state.inquiry}`, {
                    cancelToken: this.signal.token
                });

                this.renderSearchResults([data.data]);
                if(!data.data.error) sessionStorage.setItem('results', JSON.stringify([data.data]));
            }

            // save inquiry
            sessionStorage.setItem('inquiry', this.state.inquiry.toLowerCase());

            // save key for kanjiAlive API if it is valid
            localStorage.setItem('APIKey', this.state.APIKey);
        } catch (err) {
            if (axios.isCancel(err)) {
                // stop if request was canceled
                return;
            } else if (err.request.status === 401) {
                // if user's API key isn't valid
                this.setState({
                    usersKey: '',
                    APIKey: null,
                    displayModal: true,
                    showSpiner: false
                });
            }
        }
    }

    renderSearchResults = (results) => {
        // if anything was searched and nothing was found show message that nothing was found
        // check both state and storage as state can be not set yet after page was rerendered
        if ((!results.length || results[0].error) && (this.state.inquiry || sessionStorage.getItem('inquiry'))) {
            sessionStorage.removeItem('results');
            
            this.setState({
                noResults: true,
                showSpiner: false
            });
            return;
        }

        // render separated element for every found kanji
        const resultsList = results.map(result => {
            const { kanji, radical, references } = result;
            
            return (
                <KanjiPreview
                    kanji={kanji.character}
                    radical={radical}
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
            noResults: false,
            showSpiner: false
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

    fullReset = () => {
        // reset state when page is switched to kanji's details
        this.setState({
            inquiry: '',
            searchMode: 'english',
            data: [],
            results: [],
            noResults: false,
            showSpiner: false
        });
        // go to KanjiDetails -> switch to KanjiSearch -> refresh page -> results from the previous search would be rendered if storage isn't cleared
        sessionStorage.clear();
    }

    // set API key to the value given by user and hide modal
    handleAPIKey = (e) => {
        e.preventDefault();

        // null is needed to prevent empty string saving
        this.setState(prevState => ({
            APIKey: prevState.usersKey || null,
            displayModal: false
        }));
    }

    // handle modal's input change
    handleUsersKey = (e) => {
        const value = e.currentTarget.value;

        this.setState({
            usersKey: value
        });
    }

    renderModal = () => {
        this.setState({
            usersKey: '',
            APIKey: null,
            displayModal: true
        });
    }

    // hide modal without saving key
    hideModal = () => {
        if (this.state.displayModal) {
            this.setState({
                usersKey: '',
                displayModal: false
            });
        }
    }

    //hide modal on esc press
    handleKeyDown = (e) => {
        if (e.keyCode === 27) this.hideModal();
    }

    render() {
        const { match: { path } } = this.props;
        const { inquiry, searchMode, data, results, noResults, showSpiner, APIKey, usersKey, displayModal } = this.state;

        return (
            <>
                <TitleComponent title="Kanji search" />
                
                <div className="kanji-search-container">
                    <Switch>
                        <Route path={`${path}`} exact>
                            <form
                                onSubmit={this.handleSubmit}
                            >
                                <div className="search-block">
                                    <input
                                        type="text"
                                        value={inquiry}
                                        onChange={this.handleChange}
                                    />
                                
                                    <svg
                                        role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        onClick={this.handleReset}
                                        tabIndex="0"
                                    >
                                        <path d="M6.34314575 6.34314575L17.6568542 17.6568542M6.34314575 17.6568542L17.6568542 6.34314575" />
                                    </svg>

                                    <select
                                        value={searchMode}
                                        onChange={this.handleChange}
                                    >
                                        <option value="english">
                                            English meaning
                                        </option>

                                        <option value="kanji">
                                            Kanji character
                                        </option>
                                    </select>
                                </div>
                                
                                <button type="submit">Search</button>
                            </form>

                            {/* // if nothing was found display message about lack of answers for user's request */}
                            <>
                                {showSpiner ? (
                                        <div className="spiner-container">
                                            <div className="spiner"></div>
                                        </div>
                                    ) : noResults ? (
                                        <div className="no-results">
                                            <span>Nothing found</span>
                                        </div>
                                    ) : (
                                        <ul className="kanji-search-results">
                                            {results}
                                        </ul>
                                    )
                                }
                            </>    
                        </Route>

                        <Route
                            path={`${path}/view/:kanji`}
                            render={({ match: { params } }) => {
                                return (
                                    <KanjiDetails
                                        kanji={params.kanji}
                                        allCharacters={data}
                                        resetKanjiSearch={this.fullReset}
                                        APIKey={APIKey}
                                        displayModal={displayModal}
                                        renderModal={this.renderModal}
                                    />
                                );
                            }}
                        />
                    </Switch>

                    {
                        this.state.displayModal &&
                        <Modal
                            hideModal={this.hideModal}
                        >
                            <div className="modal-body with-btn">
                                <p>Unfortunately, this page is available only with an authorization key. You can get it after registration on <a href="https://rapidapi.com/KanjiAlive/api/learn-to-read-and-write-japanese-kanji" target="blank">Kanji Alive page</a>. The key is placed in X-RapidAPI-Key line.</p>

                                <form
                                    onSubmit={this.handleAPIKey}
                                >
                                    <input
                                        type="text"
                                        placeholder="Key"
                                        value={usersKey}
                                        onChange={this.handleUsersKey}
                                    />

                                    <button type="submit">Confirm</button>
                                    
                                    <Link to="/" className="homepage-btn">Homepage</Link>
                                </form>
                            </div>
                        </Modal>
                    }
                </div>
            </>
        );
    }
};

export default KanjiSearch;