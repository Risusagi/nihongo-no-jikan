import React from 'react';

const CharacterCard = (props) => {
    return (
        <li>
            <div>
                {props.character}    
            </div>
            <div>
                {props.transcription}    
            </div>
        </li>
    )
};

export default CharacterCard;