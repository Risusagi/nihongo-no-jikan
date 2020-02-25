import React from 'react';
import { withRouter } from 'react-router-dom';

const KanjiPreview = (props) => {
    const { kanji, radical, strokes, meanings, onyomi, kunyomi } = props;

    // separate strings (word/reading separated with coma and space or japanese coma) got from API into individual list items
    const prepareItems = (items) => {
        return items.split(/,/).map((item, i, arr) => {
            return (
                <li
                    key={`${item}${i}`}
                >
                    {`${item}${i !== arr.length - 1 ? ',' : ''}`}
                </li>
            );
        });
    }

    const showMore = () => {
        props.history.push(`${props.match.path}/view/${kanji}`);
    }

    const meaningForm = meanings.indexOf(',') === -1 ? 'meaning' : 'meanings';

    return (
        <li className="kanji-preview">
            <div className="kanji-char">
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

            

            <div className="details">
                <span className="category">on</span> {onyomi}
            </div>

            <div className="details">
                <span className="category">kun</span> {kunyomi}
            </div>

            <div className="details">
                <span className="category">{meaningForm}</span>
                <ul>{prepareItems(meanings)}</ul>
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