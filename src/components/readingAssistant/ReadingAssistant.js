import React from 'react';

import Kuroshiro from 'kuroshiro';
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";

import * as wanakana from "wanakana";

import FuriganaForm from './FuriganaForm';
import TitleComponent from '../TitleComponent';

class ReadingAssistant extends React.Component {
    state = {
        text: '',
        katakanaTranscription: true,
        convertedText: {
            __html: ''
        }
    }

    // initialize kuroshiro converter
    initializeKuroshiro = async () => {
        this.kuroshiro = new Kuroshiro();
        await this.kuroshiro.init(new KuromojiAnalyzer());        
    }

    componentDidMount = () => {
        this.initializeKuroshiro();
    }

    // handle onchange even of checkbox and textarea inside FuriganaForm
    handleChange = async (property, value) => {
        // rerender text with furigana every time user changes katakana transcription requirement, except the case when text wasn't converted previously
        if (property === 'katakanaTranscription' && this.state.convertedText.__html) {
            const convertedText = await this.handleConvertion(this.state.text, value);
            
            this.setState(prevState => (
                {
                    ...prevState,
                    [property]: value,
                    convertedText: {
                        __html: convertedText
                    }
                }
            ));

            return;
        }

        this.setState(prevState => (
            {
                ...prevState,
                [property]: value
            }
        ));
    }
    
    // create text with furigana
    handleConvertion = async (text, createKatakanaTranscription) => {
        // if given text isn't in japanese don't try to convert it
        if (!Kuroshiro.Util.hasJapanese(text)) {
            alert("Given text doesn't contain Japanese");
            return;
        }

        // convert text got from user via form element
        const convertionResult = await this.kuroshiro.convert(text, {
            to: 'hiragana',
            mode: 'furigana'
        });
                
        // furigana in hiragana creates separated ruby for every kanji character and do nothing with katakana
        let resultCode = this.handleNewLines(convertionResult);
        
        // kuroshiro doesn't provide hiragana <-> katakana convertions
        // create transcription for katakana only if user wants it
        if (createKatakanaTranscription) {
            const strings = [];
            let count = -1;
            resultCode.split('').map((char, i, arr) => {
                // if character is in katakana
                const isKat = wanakana.isKatakana(char);
                if (isKat) {
                    // if it is a first katakana character or previous character isn't katakana create new element inside the strings array
                    if (i === 0 || !wanakana.isKatakana(arr[i - 1])) {
                        count++;
                        strings.push('');
                    }
                    // add current character to currently created string
                    strings[count] += char;
                }
            });

            // create ruby element for every katakana string
            for (let str of strings) {
                const regExp = new RegExp('(?<!\<ruby\>)' + str + '(?!\<rp\>)');
                
                resultCode = resultCode.replace(regExp, `<ruby>${str}<rp>(</rp><rt>${wanakana.toHiragana(str)}</rt><rp>)</rp></ruby>`);
            }
        }

        return `<p>${resultCode}</p>`;
    }

    // render text with furigana inside special container
    renderConvertedText = async (text, katakanaRequired) => {
        const convertedText = await this.handleConvertion(text, katakanaRequired);

        // change state to show text with furigana to user (html code, not normal text)
        this.setState(prevState => ({
            ...prevState,
            convertedText: {
                __html: convertedText
            }
        }));
    }

    handleNewLines(codeToChange) {
        return codeToChange.replace(/\n(?!<\/rt>)/g, '</p> <p>');
    }

    render = () => {
        return (
            <>
                <TitleComponent title="Reading assistant" />
                
                <div className="reading-assistant">
                    <FuriganaForm
                        handleChange={this.handleChange}
                        renderConvertedText={this.renderConvertedText}
                        text={this.state.text}
                        katakanaTranscription={this.state.katakanaTranscription}
                    />

                    {/* output div */}
                    <div
                        lang="ja-jp"
                        className="converted-text custom-scrollbar"
                        dangerouslySetInnerHTML={this.state.convertedText}
                    >
                    </div>
                    
                </div>
            </>
        );
    }
};

export default ReadingAssistant;