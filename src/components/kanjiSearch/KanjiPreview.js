import React from 'react';
import ListItem from './ListItem';
import { toRomaji } from 'wanakana';

const KanjiPreview = (props) => {
    const { kanji, radical, strokes, meanings, onyomi, kunyomi } = props;

    // separate strings (word/reading separated with coma and space or japanese coma) got from API into individual list items
    const prepareItems = (items, convertionRequired = false) => {
        return items
        .replace(/([,、])\s/g, '$1')
        .replace(/n\/a/g, '') //for cases when pronunciation
        .split(/[,、]/).map((item, i) => {
            if (!item) return;
            return (
                <ListItem
                    text={item}
                    key={convertionRequired ? `${toRomaji(item)}${i}` : `${item}${i}`}
                />
            );

        });
    }

    return (
        <li>
            <div>
                <div>
                    {kanji}
                </div>
                <div>
                    {radical}
                </div>
                <div>
                    {strokes}
                </div>    
            </div>

            <div>
                <ul>
                    {prepareItems(meanings)}
                </ul>
            </div>

            <div>
                <ul>
                    {prepareItems(onyomi, true)}
                </ul>
            </div>

            <div>
                <ul>
                    {prepareItems(kunyomi,true)}
                </ul>
            </div>
        </li>
    )
};

export default KanjiPreview;