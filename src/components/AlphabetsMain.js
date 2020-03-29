import React from 'react';
import { Link } from 'react-router-dom';
import TitleComponent from './TitleComponent';

const AlphabetsMain = ({ match: { url } }) => {
    return (
        <>
            <TitleComponent title="Alphabets" />

            <ul className="alphabets-main">
                <li>
                    <Link to={`${url}/tabels`}>
                        Tabels
                    </Link>
                </li>
                
                <li>
                    <Link to={`${url}/test`}>
                        Quiz
                    </Link>
                </li>
            </ul>
        </>
    );
};

export default AlphabetsMain;