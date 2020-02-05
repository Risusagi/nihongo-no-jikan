import React from 'react';
import Card from './Card';
import ChoicePanel from './ChoicePanel';

export default class AlphabetsTest extends React.Component {
    state = {
        questionsAmount: 0,
        rightAnswers: 0,
        cards: [],
        currentQuestion: 0,
        renderTest: false
    }
    
    // if user's answer was correct increase count of right answers and switch to next card
    handleAnswer = (rightAnswer) => {
        if (!rightAnswer) return;
        
        this.setState(prevState => (
            {
                ...prevState,
                rightAnswers: prevState.rightAnswers + 1,
                currentQuestion: prevState.currentQuestion + 1
            }
        ));
    }

    // switch to next question but don't change right answers amount
    switchToNextQuestion = () => {
        this.setState(prevState => (
            {
                ...prevState,
                currentQuestion: prevState.currentQuestion + 1
            }
        ));
    }

    // switch from the choice panel to a test's card
    prepareTestBeforeRender = (modes) => {
        this.setState(
            {
                renderTest: true
            }
        );
        
        this.createCards(modes);
    }

    createCards = (modes) => {
        const characters = this.prepareCharactersSet(modes);
        const cards = characters.map((set, i) => {
            return (
                <Card
                    transcription={set.char}
                    mode={set.mode}
                    handleAnswer={this.handleAnswer}
                    questionsAmount={characters.length}
                    index={i + 1}
                    key={`${set.char}`}
                    switchAfterMistake={this.switchToNextQuestion}
                />
            )
        });

        this.setState(
            {
                cards: cards,
                questionsAmount: characters.length
            }
        );
    }

    prepareCharactersSet = (modes) => {
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

        const characters = charactersSets.flat();
        
        // mix characters
        for (let i = 0; i < characters.length; i++) {
            const currentChar = characters[i];
            const randomInd = Math.floor(Math.random() * characters.length);
            const randomChar = characters[randomInd];

            characters[i] = randomChar;
            characters[randomInd] = currentChar;
        }
        return characters;
    }

    render() {
        const { cards, currentQuestion, renderTest } = this.state;

        // if render of test isn't allowed render panel of selecting alphabet for test
        // if it's allowed render proper card of test
        return (
            <div>
                {
                    !renderTest
                    &&
                    <ChoicePanel
                        switchToTest={this.prepareTestBeforeRender}
                    />
                }

                {/* card with current question */}
                {
                    renderTest && cards[currentQuestion]
                }
            </div>
        );
    }
}