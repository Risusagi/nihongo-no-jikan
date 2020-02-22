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
        <div className="result-container">
            <div className="result-board">
                <div>{points}%</div>
                <div>({props.score}/{props.max})</div>
                
                <Link to="/alphabets/test">
                    <button className="restart-btn-quiz">Restart</button>
                </Link>
            </div>
        </div>
    );
};

export default ResultBoard;