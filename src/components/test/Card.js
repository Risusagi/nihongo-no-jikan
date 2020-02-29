import React from 'react';
import { toHiragana, toKatakana } from 'wanakana';

export default class Card extends React.Component {
    state = {
        // user's answer
        answer: '',
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
        this.props.handleAnswer(this.props.character === this.state.answer, this.props.index);
    }

    render() {
        const { character, mode, questionsAmount, index, showAnswer } = this.props;
        
        return (
            <div className="card-container">
                <div
                    className="quiz-card"
                    style={{animationName: showAnswer ? 'shake' : ''}}
                >
                    {/* user's progress */}
                    <span className="progress-count">
                        {index}/{questionsAmount}
                    </span>

                    {/* character in hiragana or katakana */}
                    <div className="quiz-character" lang="ja-jp">
                        { mode === 'hiragana' ? toHiragana(character) : toKatakana(character) }
                    </div>
                    
                    <div
                        className="right-answer"
                        style={{opacity: showAnswer ? 1 : 0}}
                    >
                        {character}
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