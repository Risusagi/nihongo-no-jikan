import React from 'react';

export default class ChoicePanel extends React.Component {
    constructor(props) {
        super(props);
        
        this.defaultMessage = 'Select at least one alphabet, please';

        this.state = {
            message: this.defaultMessage,
            modes: []
        };
    }
    

    // handle change of checkboxes status and mode for future test changes
    handleChange = (e) => {
        const selectedMode = e.currentTarget.value;
        let modes = this.state.modes;

        // add changed checkbox's mode to modes list if it wasn't checked before change and delete it from the list if it was on it
        !modes.includes(selectedMode) ? modes.push(selectedMode) : modes = modes.filter(mode => mode !== selectedMode);

        this.setState(
            {
                modes: modes
            },
            () => this.createMessage()
        );
    }

    // render message accordigly to users choice of alphabet(s)
    createMessage = () => {
        const { modes } = this.state;
        const hiraganaSelected = modes.includes('hiragana');
        const katakanaSelected = modes.includes('katakana');

        let alphabet = '';
        if (hiraganaSelected && katakanaSelected) {
            alphabet = 'hiragana and katakana';
        } else if (hiraganaSelected) {
            alphabet = 'hiragana';
        } else if (katakanaSelected) {
            alphabet = 'katakana';
        }

        const message = alphabet ? `You will get ${alphabet} quiz` : this.defaultMessage;

        this.setState(
            {
                message: message
            }
        );    
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        // if at least one alphabet was selected allow test rendering and create cards with the array of modes (inside AlphabetsTest)
        if (this.state.modes.length) this.props.switchToTest(this.state.modes);
    }
    
    render() {
        return (
            <div>
                <form
                    onSubmit={this.handleSubmit}
                >
                    <label>
                        Hiragana
                        <input
                            type="checkbox"
                            value="hiragana"
                            checked={this.state.modes.includes('hiragana')}
                            onChange={this.handleChange}
                            key="hiragana_checkbox"
                        />
                    </label>

                    <label>
                        Katakana
                        <input
                            type="checkbox"
                            value="katakana"
                            checked={this.state.modes.includes('katakana')}
                            onChange={this.handleChange}
                            key="katakana_checkbox"
                        />
                    </label>

                    {/* message about which alphabet was selected */}
                    {this.state.message}
                    
                    <button type="submit">Start</button>

                </form>
            </div>
        );
    }
}