import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    // switch menu icon between cross and hamburger menu accordingly to navigation's visibility
    const handleMenuIcon = () => {
        const menuIsVisible = document.querySelector('nav').classList.contains('visible');

        document.querySelector('.navigation-panel svg').innerHTML = menuIsVisible ? `<path d="M6.34314575 6.34314575L17.6568542 17.6568542M6.34314575 17.6568542L17.6568542 6.34314575"></path>` : `<path d="M6 7L18 7M6 12L18 12M6 17L18 17"></path>`;
    }

    // display or hide navigation
    const renderMenu = () => {
        const navbar = document.querySelector('nav');
        navbar.classList.toggle('visible');

        handleMenuIcon();
    };

    // hide navigation if some of the subpages was selected (only for smaller screens)
    const hideMenu = () => {
        document.querySelector('nav').classList.remove('visible');
        
        handleMenuIcon();
    };

    window.addEventListener('keypress', (e) => {
        if (e.keyCode === 13 && e.target === document.querySelector('.navigation-panel svg')) {
            renderMenu();    
        }
    });

    return (
        <div className="navigation-panel">
            <div className="logo" onClick={hideMenu}>
                <Link to="/">
                    NNJ
                </Link>
            </div>

            <svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="hamburgerIconTitle" onClick={renderMenu} tabIndex="0">
                <path d="M6 7L18 7M6 12L18 12M6 17L18 17"></path>
            </svg>
            
            <nav onClick={hideMenu}>
                <ul className="navbar">
                    <li>
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    
                    
                    <li className="alphabets">
                        <Link to="/alphabets">
                            Alphabets
                        </Link>

                        <ul className="alphabets-list">
                            <li>
                                <Link to="/alphabets/tabels">
                                    Tabels
                                </Link>
                            </li>
                            <li>
                                <Link to="/alphabets/test">
                                    Quiz
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link to="/romajiConverter">
                            Romaji Converter
                        </Link>
                    </li>

                    <li>
                        <Link to="/kanjiSearch">
                            Kanji Search
                        </Link>
                    </li>
                    
                    <li>
                        <Link to="/readingAssistant">
                            Reading Assistant
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
};

export default Nav;