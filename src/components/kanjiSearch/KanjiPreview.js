import React from 'react';
import { withRouter } from 'react-router-dom';
import { toRomaji } from 'wanakana';
import ListItem from './ListItem';

const KanjiPreview = (props) => {
    const { kanji, radical, strokes, meanings, onyomi, kunyomi } = props;

    // separate strings (word/reading separated with coma and space or japanese coma) got from API into individual list items
    const prepareItems = (items, convertionRequired = false) => {
        return items
        .replace(/([,、])\s/g, '$1')
        .replace(/n\/a/g, '') //for cases when pronunciation isn't available
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

    const showMore = () => {
        props.history.push(`${props.match.path}/view/${kanji}`);
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

            <button
                onClick={showMore}
            >
                Details
            </button>
        </li>
    )
};

export default withRouter(KanjiPreview);