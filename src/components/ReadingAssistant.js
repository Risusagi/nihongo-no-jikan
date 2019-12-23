import React from 'react';

import Kuroshiro from 'kuroshiro';
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";

import * as wanakana from "wanakana";

import FuriganaForm from './FuriganaForm';

class ReadingAssistant extends React.Component {
    state = {
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
    
    handleConvertion = async (text, format) => {
        // if given text isn't in japanese don't try to convert it
        if (!Kuroshiro.Util.hasJapanese(text)) {
            alert("Given text doesn't contain Japanese");
            return;
        }

        const convertionResult = await this.kuroshiro.convert(text, {
            to: format,
            mode: 'furigana',
            // will be applied only for convertions to romaji
            romajiSystem: 'hepburn'
        });
        
        
        if (format === 'romaji') {
            // romaji format creates only one ruby (default) that's why it is necessary to close it before the end of every paragraph
            this.handleNewLines('</ruby></p> <p><ruby>', convertionResult);

            // delete empty rt elements (with parentheses inside rp elements) to not show to users empty parentheses at the begininng of next pagaraphs if rt isn't supported by users' browsers
            this.resultCode = this.resultCode.replace(/\<rp\>\(\<\/rp\>\<rt\>[\n\r]\<\/rt\>\<rp\>\)\<\/rp\>/g, '')

            // replace all special symbols and numbers in furigana with spaces
            // don't change to empty replacement (will create shift in furigana)
                .replace(/<rp>\(<\/rp><rt>[0-9`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]<\/rt><rp>\)<\/rp>/g, '<rt> </rt>');
        } else {
            // hiragana and katakana create separated ruby for every kanji/kana character
            this.handleNewLines('</p> <p>', convertionResult);
        }

        // if format is hiragana and final code contains katakana add furigana to it, kuroshiro doesn't provide hiragana <-> katakana convertions
        if (format === 'hiragana') {
            const strings = [];
            let count = -1;
            this.resultCode.split('').map((char, i, arr) => {                
                const isKat = wanakana.isKatakana(char);
                if (isKat) {
                    if (i === 0 || !wanakana.isKatakana(arr[i - 1])) {
                        count++;
                        strings.push('');                        
                    }
                    strings[count] += char;
                }
            });
        
            for (let str of strings) {
                const regExp = new RegExp('(?<!\<ruby\>)' + str)
                this.resultCode = this.resultCode.replace(regExp, `<ruby>${str}<rp>(</rp><rt>${wanakana.toHiragana(str)}</rt><rp>)</rp></ruby>`);
            }
        }
        // change state to show text with furigana to user (html code, not normal text)
        this.setState(prevState => (
            {
                ...prevState,
                convertedText: {__html: `<p>${this.resultCode}</p>`}
            }
        ));
    }

    handleNewLines(newLineCode, codeToChange) {
        this.resultCode = codeToChange.replace(/\n(?!<\/rt>)/g, newLineCode);
    }
    render = () => {
        return (
            <div>
                <FuriganaForm
                    handleTextConvertion={this.handleConvertion}
                />

                {/* output div */}
                <div
                    className="converted-text"
                    dangerouslySetInnerHTML={this.state.convertedText}
                >
                </div>
                
            </div>
        );
    }
};

export default ReadingAssistant;