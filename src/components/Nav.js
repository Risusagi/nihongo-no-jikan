import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
            <ul>
                <Link to="/">
                  <li>Home</li>  
                </Link>
                
                <li>
                    Alphabets
                    <ul>
                        <Link to="/alphabets/tabels">
                            <li>Tabels</li>
                        </Link>
                        <Link to="/alphabets/test">
                            <li>Test</li>
                        </Link>
                        
                    </ul>
                </li>

                <Link to="/romajiConverter">
                    <li>Romaji Converter</li>
                </Link>

                <Link to="/kanjiSearch">
                    <li>Kanji Search</li>
                </Link>

                <Link to="/readingAssistant">
                    <li>Reading Assistant</li>
                </Link>
            </ul>
        </nav>
    )
};

export default Nav;