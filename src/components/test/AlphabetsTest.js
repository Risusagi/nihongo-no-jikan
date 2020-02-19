import React, { useState, useEffect } from 'react';
import { withRouter, Route, useRouteMatch} from 'react-router-dom';
import Card from './Card';
import ChoicePanel from './ChoicePanel';
import ResultBoard from './ResultBoard';
import Page404 from '../Page404';

const AlphabetsTest = (props) => {
    const [score, setScore] = useState(0);
    const [currentQuestion, setProgress] = useState(0);
    const [characters, setCharactersList] = useState([{char: '', mode: ''}]);
    const [showAnswer, setAnswerDisplay] = useState(false);
    const match = useRouteMatch();

    // on component mount, every time when page was refreshed
    // values were set in ChoicePanel's componentDidMount (0, 0, [{char: '', mode: ''}]) and then can be changed
    useEffect(() => {
        setScore(Number(sessionStorage.getItem('score')));
        setProgress(Number(sessionStorage.getItem('current')));
        setCharactersList(JSON.parse(sessionStorage.getItem('characters')));
    }, []);

    // change score and current question's count only if its value was really changed (became different from zero) to not call every time when value is changed from 0 to 0
    useEffect(() => {
        if (score > 0) sessionStorage.setItem('score', score);
    }, [score]);

    useEffect(() => {
        if (currentQuestion > 0) sessionStorage.setItem('current', currentQuestion);
    }, [currentQuestion]);

    // save characters set in sessionStorage if it was created and set to characters state value
    // do nothing if characters were set to [{char: '', mode: ''}] on component mount
    useEffect(() => {
        if (characters[0].char) sessionStorage.setItem('characters', JSON.stringify(characters));
    }, [characters]);


    // if user's answer was correct increase count of right answers and switch to next card (in any case)
    const handleAnswer = (rightAnswer, lastIndex) => {

        // in case current question is the last one from the list

        if (lastIndex === characters.length && rightAnswer) {
            props.history.push(`${match.path}/result`);
            setScore(score + 1);
            return;
        }
        if (lastIndex === characters.length && showAnswer) {
            props.history.push(`${match.path}/result`);
            setAnswerDisplay(false);
            return;
        }

        // second try to switch to the next question
        // set progress here to not display next card before switch to next page
        if (showAnswer) {
            setProgress(currentQuestion + 1);
            props.history.push(`${match.path}/q/${lastIndex + 1}`);
            setAnswerDisplay(false);
            return;
        }

        // first try to switch to the next question
        // switch to next question if answer was correct
        // show correct answer if usermade mistake, stay at current page
        if (rightAnswer) {
            setScore(score + 1);
            setProgress(currentQuestion + 1);
            props.history.push(`${match.path}/q/${lastIndex + 1}`);
        } else {
            setAnswerDisplay(true);
        }
    }

    // generate characters set accordingly to modes selected by user
    const prepareCharactersSet = (modes) => {
        const charactersList = [
            'a', 'i', 'u', 'e', 'o',
            'ka', 'ki', 'ku', 'ke', 'ko',
            'sa', 'shi', 'su', 'se', 'so',
            'ta', 'chi', 'tsu', 'te', 'to',
            'na', 'ni', 'nu', 'ne', 'no',
            'ha', 'hi', 'fu', 'he', 'ho',
            'ma', 'mi', 'mu', 'me', 'mo',
            'ya', 'yu', 'yo',
            'ra', 'ri', 'ru', 're', 'ro',
            'wa', 'wo',
            'n'
        ];
        
        // double every character if two alphabets were selected
        const charactersSets = modes.map(mode => {
            return charactersList.map(char => (
                {
                    char: char,
                    mode: mode
                }
            ));
        });

        const chars = charactersSets.flat();
        
        // mix characters
        for (let i = 0; i < chars.length; i++) {
            const currentChar = chars[i];
            const randomInd = Math.floor(Math.random() * chars.length);
            const randomChar = chars[randomInd];

            chars[i] = randomChar;
            chars[randomInd] = currentChar;
        }

        setCharactersList(chars);
    }

    // clear all statistics every time user switches to test's choice panel
    const clearStatistics = () => {
        setScore(0);
        setProgress(0);
        setCharactersList([{char: '', mode: ''}]);
        setAnswerDisplay(false);
        sessionStorage.setItem('points', 0);
    }

    const currSet = characters[currentQuestion];
    
    return (
        <div>
            <Route path={`${match.path}`} exact>
                <ChoicePanel
                    switchToTest={prepareCharactersSet}
                    clearStatistics={clearStatistics}
                />
            </Route>

            <Route path={`${match.path}/q/:index`}>
                {
                    characters[0].char ? (
                    /* card with current question */
                        <Card
                            transcription={currSet.char}
                            mode={currSet.mode}
                            handleAnswer={handleAnswer}
                            questionsAmount={characters.length}
                            index={currentQuestion + 1}
                            key={`${currSet.char}-${currSet.mode}`}
                            showAnswer={showAnswer}
                        />    
                    ) : (
                        <Page404 />
                    )
                }
                
            </Route>
            
            <Route path={`${match.path}/result`}>
                <ResultBoard score={score} max={characters.length}/>
            </Route>
        </div>
    );
};

export default withRouter(AlphabetsTest);