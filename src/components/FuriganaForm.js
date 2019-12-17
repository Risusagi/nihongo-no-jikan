import React from 'react';

import FuriganaTypeInput from './FuriganaTypeInput';


class FuriganaForm extends React.Component {
    state = {
        text: '',
        // default value as in kuroshiro library ('to' option)
        format: 'hiragana'
    }

    handleChange = (e) => {
        const value = e.target.value;
        // matches both format of furigana(hiragana, katakana, romaji) or text received from user
        const property = e.target.type === 'textarea' ? 'text' : 'format';
        
        this.setState(prevState => (
            {
                ...prevState,
                [property]: value
            }
        ));
    }

    // convert text to speech, uses Responsice voice library (applied by URL)
    handleTextReading = () => {
        responsiveVoice.speak(this.state.text, "Japanese Male", {rate: .9});
    }

    handleTextConvertion = (e) => {
        e.preventDefault();

        // send data to parent
        this.props.handleTextConvertion(this.state.text, this.state.format);
    }

    render = () => {
        return (
            <form
                onSubmit={this.handleTextConvertion}
            >
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