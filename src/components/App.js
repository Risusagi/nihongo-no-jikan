import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Nav from './Nav';
import HomePage from './HomePage';
import AlphabetsMain from './AlphabetsMain';
import Alphabets from './alphabets/Alphabets';
import AlphabetsTest from './test/AlphabetsTest';
import KanjiSearch from './kanjiSearch/KanjiSearch';
import RomajiConverter from './romajiConverter/RomajiConverter';
import ReadingAssistant from './readingAssistant/ReadingAssistant';
import Page404 from './Page404';

const App = () => {
    return (
        <Router basename="/">
            <>
                <Nav />
                <div className="content">
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/alphabets" exact component={AlphabetsMain} />
                        <Route path="/alphabets/tabels" component={Alphabets} />
                        <Route path="/alphabets/test" component={AlphabetsTest} />
                        <Route path="/kanjiSearch" component={KanjiSearch} />
                        <Route path="/romajiConverter" component={RomajiConverter} />
                        <Route path="/readingAssistant" component={ReadingAssistant} />
                        <Route component={Page404} />
                    </Switch>
                </div>
            </>
        </Router>
    );
};

export default App;