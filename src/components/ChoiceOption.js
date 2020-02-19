import React from 'react';

// radio inputs that handle choice of transcription's mode (romaji/hiragana)
const ChoiceOption = (props) => {
    const {name, mode, handleChange} = props;
    
    const handleModeChange = (e) => handleChange(e.currentTarget.value);

    return (
        <label>
            {name.charAt(0).toUpperCase() + name.slice(1)}
            <input
                type="radio"
                checked={mode === name}
                onChange={handleModeChange}
                value={name}
            />
        </label>
    );
};

export default ChoiceOption;