import React from 'react';

import FuriganaTypeInput from './FuriganaTypeInput';


class FuriganaForm extends React.Component {
    state = {
        text: '',
        format: ''
    }
    
    handleChange = (e) => {
        const value = e.target.value;
        const property = e.target.type === 'textarea' ? 'text' : 'format';
        
        this.setState(prevState => (
            {
                ...prevState,
                [property]: value
            }
        ));
    }

    // convert text to speech
    handleTextReading = () => {
        responsiveVoice.speak(this.state.text, "Japanese Male", {rate: .9});
    }

    render = () => {
        return (
            <form>
                <ul>
                    <li>
                        <FuriganaTypeInput
                            type="romaji"
                            format={this.state.format}
                            onChange={this.handleChange}
                        />
                    </li>
                    <li>
                        <FuriganaTypeInput
                            type="hiragana"
                            format={this.state.format}
                            onChange={this.handleChange}
                        />
                    </li>
                    <li>
                        <FuriganaTypeInput
                            type="katakana"
                            format={this.state.format}
                            onChange={this.handleChange}
                        />
                    </li>
                </ul>
                
                <textarea
                    onChange={this.handleChange}
                    value={this.state.text}
                />

                <button
                    type="button"
                    onClick={this.handleTextReading}
                >
                    Read text
                </button>

                <button
                    type="submit"
                >
                    Add furigana
                </button>
            </form>
        )
    }
}

export default FuriganaForm;