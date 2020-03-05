import React, { useState, useEffect } from 'react';
import { withRouter, Route, useRouteMatch} from 'react-router-dom';
import Card from './Card';
import ChoicePanel from './ChoicePanel';
import ResultBoard from './ResultBoard';
import Page404 from '../Page404';
import TitleComponent from '../TitleComponent';

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
        // alternative for cases when choicePanel was not rendered previously
        setCharactersList(JSON.parse(sessionStorage.getItem('characters')) || [{char: '', mode: ''}]);
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

    // check if user uses mobile device
    const checkDevice = () => {
        let check = false;

        (function(a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
                check = true;
            }
        })(navigator.userAgent || navigator.vendor || window.opera);

        return check;
    }

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

            navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

            if (navigator.vibrate && checkDevice()) {
                navigator.vibrate(200);
            }
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
        <>
            <TitleComponent title="Kana quiz" />
            
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
                            character={currSet.char}
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
        </>
    );
};

export default withRouter(AlphabetsTest);