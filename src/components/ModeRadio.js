import React from 'react';

const ModeRadio = (props) => {
    const {name, mode, handleModeChange} = props;
    
    return (
        <label>
            {name === 'both'? 'Hiragana/Katakana' : name.charAt(0).toUpperCase() + name.slice(1)}
            <input
                type="radio"
                checked={mode === name}
                onChange={handleModeChange}
                value={name}
            />
        </label>
    )
};

export default ModeRadio;