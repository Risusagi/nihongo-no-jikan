import React from 'react';
import { toHiragana, toKatakana } from 'wanakana';

export default class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            character: this.props.transcription,
            answer: '',
            showAnswer: false
        }
    }

    handleChange = (e) => {
        const value = e.currentTarget.value;

        this.setState(
            {
                answer: value
            }
        )
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        // switch to next question without increasing count of right answers
        if (this.state.showAnswer) this.props.switchAfterMistake();

        // if users answer is corrent (identical to current cards' symbol)
        this.props.handleAnswer(this.state.character === this.state.answer);
        
        // show right answer if given by user wasn't correct
        this.setState(
            {
                showAnswer: this.state.character !== this.state.answer
            }
        );
    }

    render() {
        return (
            <div>
                {/* user's progress */}
                <span>
                    {this.props.index}/{this.props.questionsAmount}
                </span>

                {/* character in hiragana or katakana */}
                <div>
                    { this.props.mode === 'hiragana' ? toHiragana(this.state.character) : toKatakana(this.state.character) }
                </div>

                {/* show correct answer to question if user made mistake */}
                {
                    this.state.showAnswer
                    &&
                    <div>
                        {this.state.character}
                    </div>
                }

                <form
                    onSubmit={this.handleSubmit}
                >
                    <input
                        type="text"
                        placeholder="Romaji"
                        value={this.state.answer}
                        onChange={this.handleChange}
                    />

                    <button type="submit">Next</button>
                </form>
            </div>
        )
    }
}