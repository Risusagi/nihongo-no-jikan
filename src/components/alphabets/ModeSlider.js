import React from 'react';
import ChoiceOption from './ChoiceOption';

export default class ModeSlider extends React.Component {
    state = {
        mode: this.props.mode
    }

    // change mode of transcription of katakana (transcriptionMode in Alphabets)
    // take mode value from checked radio input (ChoiceOption)
    handleChange = (mode) => {
        this.setState(
            {
                mode: mode
            },
            () => this.props.changeMode(this.props.propertyToChange, this.state.mode)
        );
    }

    // change transcription mode by slider click
    handleSlider = (e) => {
        const mode = e.clientX - e.currentTarget.offsetLeft < 25 ? 'romaji' : 'hiragana';
        this.handleChange(mode);
    }
    
    render() {
        const position = this.state.mode === 'romaji' ? 'left' : 'right';

        return (
            <div className="transcription-mode-slider">
                <ChoiceOption name="romaji" mode={this.state.mode} handleChange={this.handleChange}/>

                <div 
                    className={`slider ${position}`}
                    onClick={this.handleSlider}
                >
                    <div></div>
                </div>

                <ChoiceOption name="hiragana" mode={this.state.mode} handleChange={this.handleChange}/>
            </div>
        );
    }
}