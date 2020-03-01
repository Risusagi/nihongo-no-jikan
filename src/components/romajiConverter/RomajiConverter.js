import React from 'react';
import { isRomaji, toHiragana, toKatakana } from 'wanakana';
import ModeRadio from './ModeRadio';
import TitleComponent from '../TitleComponent';

class RomajiConverter extends React.Component {
    state = {
        mode: 'hiragana',
        romajiText: '',
        hiragana: '',
        katakana: ''
    }

    // set romajiText
    handleTextChange = (e) => {
        const text = e.currentTarget.value;

        this.setState(
            {
                romajiText: text
            }
        )
    }

    // set mode and reconvert text if mode was changed after convertion
    handleModeChange = (e) => {
        const mode = e.currentTarget.value;

        this.setState({
                mode: mode
            },
            () => {
                if(this.wasConverted) this.handleTextConvertion();
            }
        )
    }

    // convert user's text accordingly to current mode
    handleTextConvertion = () => {
        if (!isRomaji(this.state.romajiText)) return;

        if (this.state.mode === 'hiragana') {
            this.handleConvertionToHiragana();
        } else if (this.state.mode === 'katakana') {
            this.handleConvertionToKatakana();
        } else {
            this.handleConvertionToHiragana();
            this.handleConvertionToKatakana();
        }
    }

    // handle form submition
    handleFormSubmit = (e) => {
        e.preventDefault();

        this.wasConverted = true;
        this.handleTextConvertion();
    }

    // convert text to hiragana
    handleConvertionToHiragana = () => {
        // handle long vowels
        // wanakana doesn't convert long vowels correctly
        // words kou, sou, kayou and you are read with u not with long o
        let convertedText = this.state.romajiText
            .replace(/koo|soo|kayoo|yoo/gi, `$&@#&`)
            .replace(/ee(?!@#&)/gi, 'ei')
            .replace(/oo(?!@#&)/gi, 'ou')
            .replace(/@#&/g, '');
        
        // inside this words is used o instead u to show that here is a long vowel
        const exceptions = ['ooi', 'ookii', 'oosaka', 'ooyake', 'ookami', 'too', 'tooi', 'tooru', 'toori', 'toosu', 'kooru', 'koori', 'hoo'];
        for(const word of exceptions) {
            // replace for example oui (got after previous replacement) with ooi
            convertedText = convertedText.replace(word.replace(/oo/gi, 'ou'), word);
        }

        this.setState(
            {
                hiragana: toHiragana(convertedText)
            }
        );
    }

    // convert text to katakana
    handleConvertionToKatakana = () => {
        // handle long vowels
        // wanakana converts long vowels as normal characters without using dash
        const convertedText = this.state.romajiText.replace(/oo|uu|ee|ii/gi, (match) => match.charAt(0) + 'ー');
        
        this.setState(
            {
                katakana: toKatakana(convertedText)
            }
        );
    }

    // decide if div element should be displayed on the screen
    hadleConvertionDisplay = (mode) => {
        return {display: [mode, 'both'].includes(this.state.mode)? 'block' : 'none'};
    }

    render() {
        return (
            <>
                <TitleComponent title='Romaji converter' />
                
                <div className="romaji-converter-container">
                    <form
                        onSubmit={this.handleFormSubmit}
                    >
                        <div className="romaji-options">
                            <ModeRadio name="hiragana" mode={this.state.mode} handleModeChange={this.handleModeChange} />

                            <ModeRadio name="katakana" mode={this.state.mode} handleModeChange={this.handleModeChange} />
                            
                            <ModeRadio name="both" mode={this.state.mode} handleModeChange={this.handleModeChange} />
                        </div>

                        <div className="romaji-input-area">
                        <textarea
                            onChange={this.handleTextChange}
                            placeholder="Romaji text..."
                            className="custom-scrollbar"
                        >
                        </textarea>

                        <button type="submit">Convert</button>
                        </div>
                    </form>

                    <div className="romaji-outputs">
                        {/* container for text in hiragana */}
                        <div
                            style={this.hadleConvertionDisplay('hiragana')}
                            lang="ja-jp"
                        >
                            <div>
                                {
                                    this.state.hiragana
                                    ||
                                    <span className="placeholder">
                                        Hiragana
                                    </span>
                                }
                            </div>
                        </div>

                        {/* container for text in katakana */}
                        <div
                            style={this.hadleConvertionDisplay('katakana')}
                            lang="ja-jp"
                        >
                            {
                                this.state.katakana
                                ||
                                <span className="placeholder">
                                    Katakana
                                </span>
                            }
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default RomajiConverter;