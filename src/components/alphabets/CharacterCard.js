import React from 'react';

const CharacterCard = (props) => {
    return (
        <li>
            <div>
                <div className="char">
                    {props.character}    
                </div>
                <div>
                    {props.transcription}    
                </div>
            </div>
        </li>
    )
};

export default CharacterCard;