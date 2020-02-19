import React from 'react';
import { Link } from 'react-router-dom';

const ResultBoard = (props) => {
    let points = Math.round(props.score / props.max * 100);

    if (props.score) {
        sessionStorage.setItem('points', points);
    } else {
        // if page was refreshed set points
        points = Number(sessionStorage.getItem('points'));
    }
    
    return (
        <div>
            {points}
            
            <Link to="/alphabets/test">
                <button>Restart</button>
            </Link>
        </div>
    );
};

export default ResultBoard;