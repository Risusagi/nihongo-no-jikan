import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
            <ul>
                <Link to="/">
                  <li>Home</li>  
                </Link>

                <Link to="/alphabets">
                    <li>Alphabets</li>
                </Link>

                <Link to="/romajiConverter">
                    <li>Romaji Converter</li>
                </Link>

                <Link to="/kanjiSearch">
                    <li>Kanji Search</li>
                </Link>

                <Link to="readingAssistant">
                    <li>Reading Assistant</li>
                </Link>
            </ul>
        </nav>
    )
};

export default Nav;