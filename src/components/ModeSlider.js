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
            () => {this.props.changeMode(this.props.propertyToChange, this.state.mode)}
        )
    }
    
    render() {
        return (
            <div>
                <ChoiceOption name="romaji" mode={this.state.mode} handleChange={this.handleChange}/>

                <div>
                    <div></div>
                </div>

                <ChoiceOption name="hiragana" mode={this.state.mode} handleChange={this.handleChange}/>
            </div>
        );
    }
}