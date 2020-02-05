import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Nav from './Nav';
import HomePage from './HomePage';
import Alphabets from './Alphabets';
import AlphabetsTest from './test/AlphabetsTest';
import KanjiSearch from './KanjiSearch';
import RomajiConverter from './RomajiConverter';
import ReadingAssistant from './ReadingAssistant';

const App = () => {
    return (
        <Router>
            <div>
                <Nav />
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/alphabets/tabels" component={Alphabets} />
                    <Route path="/alphabets/test" component={AlphabetsTest} />
                    <Route path="/kanjiSearch" component={KanjiSearch} />
                    <Route path="/romajiConverter" component={RomajiConverter} />
                    <Route path="/readingAssistant" component={ReadingAssistant} />
                </Switch>
                
            </div>
        </Router>
    );
};

export default App;