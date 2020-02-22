import React from 'react';
import { toHiragana, toKatakana } from 'wanakana';

export default class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            character: this.props.transcription,
            // user's answer
            answer: '',
            showAnswer: this.props.showAnswer
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

        //show right answer or switch to next question depend on users answer (if it is identical to current cards' symbol)
        this.props.handleAnswer(this.state.character === this.state.answer, this.props.index);
        
        // show right answer if given by user wasn't correct
        this.setState(
            {
                showAnswer: !this.props.showAnswer
            }
        );
    }

    render() {
        return (
            <div className="card-container">
                <div
                    className="quiz-card"
                    style={{animationName: this.state.showAnswer ? 'shake' : ''}}
                >
                    {/* user's progress */}
                    <span className="progress-count">
                        {this.props.index}/{this.props.questionsAmount}
                    </span>

                    {/* character in hiragana or katakana */}
                    <div className="quiz-character">
                        { this.props.mode === 'hiragana' ? toHiragana(this.state.character) : toKatakana(this.state.character) }
                    </div>
                    
                    <div
                        className="right-answer"
                        style={{opacity: this.props.showAnswer ? 1 : 0}}
                    >
                        {this.state.character}
                    </div>

                    <form
                        onSubmit={this.handleSubmit}
                    >
                        <input
                            type="text"
                            placeholder="Romaji"
                            value={this.state.answer}
                            onChange={this.handleChange}
                            autoFocus
                        />

                        <button type="submit">Next</button>
                    </form>
                </div>
            </div>
        );
    }
}