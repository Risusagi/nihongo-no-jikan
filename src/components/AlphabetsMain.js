import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import TitleComponent from './TitleComponent';

const AlphabetsMain = () => {
    return (
        <>
            <TitleComponent title="Alphabets" />

            <ul className="alphabets-main">
                <li>
                    <Link to={`${useRouteMatch().url}/tabels`}>
                        Tabels
                    </Link>
                </li>
                
                <li>
                    <Link to={`${useRouteMatch().url}/test`}>
                        Quiz
                    </Link>
                </li>
            </ul>
        </>
    );
};

export default AlphabetsMain;