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
        const position = this.state.katakanaTranscription ? 'right' : 'left';
        
        return (
            <form
                onSubmit={this.handleTextConvertion}
                className="furigana-form"
            >
                <div className="label-container">
                    <label>
                        Katakana transcription

                        <div className={`slider ${position}`}>
                            <div />
                        </div>

                        <input
                            type="checkbox"
                            checked={this.state.katakanaTranscription}
                            onChange={this.handleChange}
                        />
                    </label>
                </div>

                <textarea
                    onChange={this.handleChange}
                    value={this.state.text}
                    className="custom-scrollbar"
                    placeholder="Text"
                />

                <div className="furigana-form-btns">
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
                </div>
            </form>
        )
    }
}

export default FuriganaForm;