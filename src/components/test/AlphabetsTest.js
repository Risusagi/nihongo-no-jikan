import React, { useState, useEffect } from 'react';
import { withRouter, BrowserRouter as Switch, Route, useRouteMatch} from 'react-router-dom';
import Card from './Card';
import ChoicePanel from './ChoicePanel';

const AlphabetsTest = (props) => {
    const [score, setScore] = useState(0);
    const [currentQuestion, setProgress] = useState(0);
    const [characters, setCharactersList] = useState([{char: '', mode: ''}]);
    const match = useRouteMatch();

    // switch to next question but don't change right answers amount, in case user gave wrong answer or none answers was got
    const switchToNextQuestion = () => {
        setProgress(currentQuestion + 1);
    }

    // if user's answer was correct increase count of right answers and switch to next card (in any case)
    const handleAnswer = (rightAnswer, lastIndex) => {
        if (rightAnswer) {
            setScore(score + 1);
            switchToNextQuestion();    
        }
        
        props.history.push(`${match.path}/${lastIndex + 1}`);
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

    // on component mount, after every first render (to handle page refreshes)
    // values were set in ChoicePanel's componentDidMount
    // 0, 0, [{char: '', mode: ''}]
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

    const currSet = characters[currentQuestion];
    
    return (
        <div>
            <Switch>
                <Route path={`${match.path}`} exact>
                   <ChoicePanel
                        switchToTest={prepareCharactersSet}
                    /> 
                </Route>

                <Route path={`${match.path}/:index`}>
                    {/* card with current question */}
                    <Card
                        transcription={currSet.char}
                        mode={currSet.mode}
                        handleAnswer={handleAnswer}
                        questionsAmount={characters.length}
                        index={currentQuestion + 1}
                        key={`${currSet.char}-${currSet.mode}`}
                        switchAfterMistake={switchToNextQuestion}
                    />
                </Route>

                <Route path={`${match.path}/result`}>
                    
                </Route>
            </Switch>
        </div>
    );
};

export default withRouter(AlphabetsTest);