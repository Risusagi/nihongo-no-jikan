import React from 'react';
import { isHiragana } from 'wanakana';

const CharacterCard = (props) => {
    return (
        <li>
            <div>
                <div className="char" lang="ja-jp">
                    {props.character}    
                </div>
                <div lang={isHiragana(props.transcription) ? 'lang="ja-jp"' : null}>
                    {props.transcription}    
                </div>
            </div>
        </li>
    )
};

export default CharacterCard;