import React from 'react';

const FuriganaForm = (props) => {
    // event for textarea and one checkbox
    const handleChange = (e) => {
        const isTextArea = e.target.type === 'textarea';
        const property = isTextArea ? 'text' : 'katakanaTranscription';
        const value = isTextArea ? e.target.value : e.target.checked;
        
        props.handleChange(property, value);
    };

    // convert text to speech, uses Responsice voice library (applied by URL)
    const handleTextReading = () => {
        if (!process.env.REACT_APP_RESPONSIVEVOICES_KEY) {
            alert(`Unfortunatelly this function isn't available at this moment`)
            return;
        }

        responsiveVoice.speak(props.text, "Japanese Male", {rate: .9});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // send data to parent
        props.renderConvertedText(props.text, props.katakanaTranscription);

    };
    
    const position = props.katakanaTranscription ? 'right' : 'left';
        
    return (
        <form
            onSubmit={handleSubmit}
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
                        checked={props.katakanaTranscription}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <textarea
                lang="ja-jp"
                onChange={handleChange}
                value={props.text}
                className="custom-scrollbar"
                placeholder="Text"
            />

            <div className="furigana-form-btns">
                <button
                    type="button"
                    onClick={handleTextReading}
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
    );
}

export default FuriganaForm;