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
                answer: value.toLowerCase()
            }
        )
    }

    handleSubmit = (e) => {
        e.preventDefault();

        //show right answer or switch to next question depend on users answer (if it is identical to current cards' symbol)
        this.props.handleAnswer(this.props.character === this.state.answer, this.props.index);
    }

    render() {
        const { character, mode, questionsAmount, index, showAnswer, setVibrationMode, vibrationEnabled, vibrationAvailable } = this.props;
        
        return (
            <div className="card-container">
                <div
                    className="quiz-card"
                    style={{animationName: showAnswer ? 'shake' : ''}}
                >
                    {
                        vibrationAvailable &&
                            <svg
                                id="Capa_1" enable-background="new 0 0 479.058 479.058" height="512" viewBox="0 0 479.058 479.058" width="512" xmlns="http://www.w3.org/2000/svg"
                                onClick={setVibrationMode}
                                className={vibrationEnabled ? null : "disabled"}
                            >
                                <path d="m464.555 149.194-54.809-12.456-12.412-54.751-54.809-12.456-12.558-54.882-64.064-14.649-6.667 29.181 45.73 10.468 12.558 54.911 54.78 12.456 12.412 54.751 54.809 12.456 10.321 45.555 29.21-6.608z"/>
                                <path d="m205.202 49.297c-5.848-5.848-15.321-5.848-21.169 0l-134.735 134.735c-5.848 5.848-5.848 15.321 0 21.169l224.558 224.559c2.924 2.924 6.754 4.386 10.585 4.386s7.661-1.462 10.585-4.386l134.734-134.735c5.848-5.848 5.848-15.321 0-21.169 0 0-224.558-224.559-224.558-224.559zm56.783 326.254-180.934-180.934 113.566-113.565 180.933 180.933s-113.565 113.566-113.565 113.566z"/>
                                <path d="m161.767 384.717-54.751-12.412-12.456-54.78-54.911-12.558-10.468-45.73-29.181 6.666 14.649 64.063 54.882 12.558 12.456 54.809 54.751 12.412 12.456 54.809 63.976 14.503 6.608-29.21-45.555-10.321z"/>
                            </svg>
                        }
                    
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