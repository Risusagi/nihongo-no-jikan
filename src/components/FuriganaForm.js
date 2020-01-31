import React from 'react';

class FuriganaForm extends React.Component {
    state = {
        text: '',
        katakanaTranscription: true
    }

    // event for textarea and one checkbox
    handleChange = (e) => {
        const isTextArea = e.target.type === 'textarea';
        const property = isTextArea ? 'text' : 'katakanaTranscription';
        const value = isTextArea ? e.target.value : e.target.checked;
        
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
        this.props.handleTextConvertion(this.state.text, this.state.katakanaTranscription);
    }

    render = () => {
        return (
            <form
                onSubmit={this.handleTextConvertion}
            >
                <label>
                    Katakana transcription
                    <input
                        type="checkbox"
                        checked={this.state.katakanaTranscription}
                        onChange={this.handleChange}
                    />
                </label>

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