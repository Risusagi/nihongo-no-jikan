import React from 'react';
import { toHiragana, toKatakana } from 'wanakana';
import CharacterCard from './CharacterCard';


class Alphabets extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            alphabet: 'hiragana'
        }

        this.transcriptions = [
            'a', 'i', 'u', 'e', 'o',
            'ka', 'ki', 'ku', 'ke', 'ko',
            'sa', 'shi', 'su', 'se', 'so',
            'ta', 'chi', 'tsu', 'te', ' to',
            'na', 'ni', ' nu', 'ne', 'no',
            'ha', 'hi', 'fu', 'he', 'ho',
            'ma', 'mi', 'mu', 'me', 'mo',
            'ya', '', 'yu', '', 'yo',
            'ra', 'ri', 'ru', 're', 'ro',
            'wa', '', '', '', 'wo',
            '', '', 'n', '', ''
        ];
    } 

    handleAlphabetChoice = (e) => {
        const alphabet = e.currentTarget.value;

        this.setState(
            {
                alphabet: alphabet
            }
        );
    }

    createCards() {
        const cards = this.transcriptions.map((trans, i) => {
                if(trans === '') return <div key={`empty${i}`}></div>;

                const character = this.state.alphabet === 'hiragana' ? toHiragana(trans) : toKatakana(trans);
                return <CharacterCard character={character} transcription={trans} alphabet={this.state.alphabet}  key={`${trans}_${this.state.alphabet}`}/>  
        });

        return cards;
    }

    render() {
        return (
            <div>
                <label>
                    Hiragana
                    <input
                        type="radio"
                        checked={this.state.alphabet === 'hiragana'}
                        value='hiragana'
                        onChange={this.handleAlphabetChoice}
                    />  
                </label>
                <label>
                    Katakana
                    <input
                        type="radio"
                        checked={this.state.alphabet === 'katakana'}
                        value='katakana'
                        onChange={this.handleAlphabetChoice}
                    />  
                </label>
                
                <ul className='alphabet-table'>
                    {this.createCards()}
                </ul>
            </div>
        );
    }
};

export default Alphabets;