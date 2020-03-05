import React from 'react';
import { Link } from 'react-router-dom';
import TitleComponent from './TitleComponent';

const HomePage = () => {
    return (
        <>
            <TitleComponent />

            <div className="home-page-container">
                <p>
                    <span className="nnj">Nihongo no jikan</span> is a free online service that contains different useful tools for those who take their first steps in learning Japanese.
                </p>
                
                <div className="tab-description">
                    <p>
                        <Link className="tab-name" to="/alphabets">Alphabets</Link> tab would be helpful for those who want to learn hiragana and katakana. You can learn alphabets using tabels of their characters and than check your knowledge with a short quiz.
                    </p>
                    <p>
                        For katakana table you can switch transcription between romaji and hiragana mode. It can be a good way to repeat hiragana one more time while learning katakana.
                    </p>
                </div>

                <div className="tab-description">
                    <p>
                        <Link className="tab-name" to="/romajiConverter">Romaji converter</Link> would be useful for those who know how the word is pronounced and want to check how it should be written. It is a tool where you can type text in romaji and it would be converted to one of two Japanese alphabets (or you can get two versions at the same time if you want).
                    </p>
                </div>

                <div className="tab-description">
                    <p>
                        <Link className="tab-name" to="/kanjiSearch">Kanji search</Link> is a kanji dictionary that provides tool for searching kanji by their English meaning or by kanji itself if you need more informations about it.
                    </p>
                    <p>
                        Every kanji card provides examples how can you use that kanji in sentenses and stroke order in video and graphical version.
                    </p>
                </div>

                <div className="tab-description">
                    <p>
                        <Link className="tab-name" to="/readingAssistant">Reading assistant</Link> tab is for those who want to read texts in Japanese with furigana not just converted version. Furigana is created in hiragana. You can also switch off creation of furigana for words in katakana to practice this alphabet.
                    </p>
                    <p>
                        Reading assistant also provides text to speech convertion.
                    </p>
                </div>

                <p>Hope this page will make learning process easier for you and you will enjoy it.</p>

                <div className="credits">
                    <p>Nihongo no jikan was created with the use of:</p>
                    <ul>
                        <li>
                            <a href="https://app.kanjialive.com/api/docs">Kanji Alive</a> by Harumi Hibino Lory & Arno Bosse licensed under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0 license</a>. The original license text can be found <a href="https://kanjialive.com/credits/">here</a>.
                        </li>
                        <li>
                            <a href="https://github.com/WaniKani/WanaKana">WanaKana</a> by WaniKani Community Github under MIT license. The original license text can be found <a href="https://github.com/WaniKani/WanaKana/blob/master/LICENSE">here</a>.
                        </li>
                        <li>
                            <a href="https://github.com/hexenq/kuroshiro">kuroshiro</a> by Hexen Qi under MIT license. The original license text can be found <a href="https://github.com/hexenq/kuroshiro/blob/master/LICENSE">here</a>.
                        </li>
                        <li>
                            <a href="https://github.com/hexenq/kuroshiro-analyzer-kuromoji">kuroshiro-analyzer-kuromoji</a> by Hexen Qi under MIT license. The original license text can be found <a href="https://github.com/hexenq/kuroshiro-analyzer-kuromoji/blob/master/LICENSE">here</a>.
                        </li>
                        <li>
                            <a href="https://responsivevoice.org">ResponsiveVoice</a> under <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">Non-Commercial License</a>.
                        </li>
                    </ul>
                </div>
            </div>
            
        </>
    );
};

export default HomePage;