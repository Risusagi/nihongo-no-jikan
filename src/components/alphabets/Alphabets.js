import React from 'react';
import { toHiragana, toKatakana } from 'wanakana';
import CharacterCard from './CharacterCard';
import ModeSlider from './ModeSlider';
import TitleComponent from '../TitleComponent';

class Alphabets extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            alphabet: 'hiragana',
            transcriptionMode: 'romaji'
        };
        
        this.transcriptions = [
            'a', 'i', 'u', 'e', 'o',
            'ka', 'ki', 'ku', 'ke', 'ko',
            'sa', 'shi', 'su', 'se', 'so',
            'ta', 'chi', 'tsu', 'te', 'to',
            'na', 'ni', 'nu', 'ne', 'no',
            'ha', 'hi', 'fu', 'he', 'ho',
            'ma', 'mi', 'mu', 'me', 'mo',
            'ya', '', 'yu', '', 'yo',
            'ra', 'ri', 'ru', 're', 'ro',
            'wa', '', '', '', 'wo',
            '', '', 'n', '', ''
        ];
    } 

    // handle radio being controlled component
    handleRadioChange = (property, value) => {
        this.setState(
            {
                [property]: value
            }
        );
    }

    // generate cards with hiragana/katakana symbol and its transcription accordingly to selected characters set (hiragana/katakana) and tranascription mode (romaji/hiragana)
    createCards() {
        const {alphabet, transcriptionMode} = this.state;

        return this.transcriptions.map((trans, i) => {
            // return empty div for empty strings
            if(trans === '') return <div key={`empty${i}`}></div>;

            const character = alphabet === 'hiragana' ? toHiragana(trans) : toKatakana(trans);

            let transcription = trans;
            if (alphabet === 'katakana') {
                transcription = transcriptionMode === 'romaji' ? trans : toHiragana(trans); 
            }

            return <CharacterCard character={character} transcription={transcription} alphabet={alphabet} key={`${trans}_${alphabet}`}/>  
        });
    }

    render() {
        const {alphabet, transcriptionMode} = this.state;

        const title = `${alphabet.charAt(0).toUpperCase() + alphabet.slice(1)} table`;
        
        return (
            <>
                <TitleComponent title={title} />

                <div className="alphabet-container">
                    <div className="alphabet-options">
                        <label className={alphabet === 'hiragana' ? 'checked' : null}>
                            Hiragana
                            <input
                                type="radio"
                                checked={alphabet === 'hiragana'}
                                value='hiragana'
                                onChange={(e) => this.handleRadioChange('alphabet', e.currentTarget.value)}
                            />  
                        </label>

                        <label className={alphabet === 'katakana' ? 'checked' : null}>
                            Katakana
                            <input
                                type="radio"
                                checked={alphabet === 'katakana'}
                                value='katakana'
                                onChange={(e) => this.handleRadioChange('alphabet', e.currentTarget.value)}
                            />  
                        </label>
                    </div>
                    
                    {/* render switch slider to select mode of transcription creation */}
                    {alphabet === 'katakana' && <ModeSlider changeMode={this.handleRadioChange} propertyToChange='transcriptionMode' mode={transcriptionMode} />}

                    <div  className={`table-container ${alphabet}`}>
                        <ul className='alphabet-table'>
                            {this.createCards()}
                        </ul>
                    </div>
                </div>
            </>
        );
    }
};

export default Alphabets;