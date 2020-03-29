import React from 'react';
import { withRouter } from 'react-router-dom';

const KanjiPreview = ({
    kanji,
    radical,
    strokes,
    meanings,
    onyomi,
    kunyomi,
    history,
    match: { path }
}) => {
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
        history.push(`${path}/view/${kanji}`);
    }

    const meaningForm = meanings.indexOf(',') === -1 ? 'meaning' : 'meanings';
    const radicalImg = radical.image;

    return (
        <li className="kanji-preview">
            <div className="kanji-char">
                <div lang="ja-jp">
                    {kanji}
                </div>

                <div lang="ja-jp">
                    <img src={`${radicalImg}`} className="radical" alt="Radical character" />
                </div>

                <div className="strokes-info">
                    <svg enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
                        <path d="m173.933 260.349c43.512 12.195 74.688 46.546 86.6 84.725 11.41-9.101 25.37-20.421 40.77-33.322l-94.52-94.525c-12.75 16.311-23.92 31.082-32.85 43.122z" />
                        <path d="m451.653.355c-72.596 7.632-180.444 136.611-226.09 193.23l98.67 98.675c55.549-47.902 183.79-162.522 187.67-235.343 1.884-34.962-25.352-60.239-60.25-56.562z" />
                        <path d="m52.465 326.937c-43.706 54.633-7.118 103.387-48.345 146.857-7.179 7.569-4.618 20.004 4.98 24.113 68.277 29.23 154.26 10.25 194.109-31.767 37.467-39.505 49.058-107.533 3.602-152.992-43.809-43.813-117.297-32.52-154.346 13.789z" />
                    </svg>

                    {strokes}
                </div>    
            </div>

            

            <div className="details">
                <span className="category">on</span> <span lang="ja-jp">{onyomi}</span>
            </div>

            <div className="details">
                <span className="category">kun</span> <span lang="ja-jp">{kunyomi}</span>
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