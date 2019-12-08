import React from 'react';

const FuriganaTypeInput = (props) => {
    return (
        <label>
            <input
                type="radio"
                value={props.type}
                checked={props.format === props.type}
                onChange={props.onChange}
            />
            {props.type.charAt(0).toUpperCase() + props.type.slice(1)}
        </label>
    )
};

export default FuriganaTypeInput;