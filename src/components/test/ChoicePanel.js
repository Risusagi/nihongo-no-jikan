import React from 'react';
import { withRouter } from "react-router-dom";

class ChoicePanel extends React.Component {
    constructor(props) {
        super(props);
        
        this.defaultMessage = 'Select at least one alphabet, please';

        this.state = {
            message: this.defaultMessage,
            modes: []
        };
    }
    
    // set initial values of test parameters or reset them if they were set previously and then user cameback to choice panel page
    componentDidMount = () => {
        sessionStorage.setItem('score', 0);
        sessionStorage.setItem('current', 0);
        sessionStorage.setItem('characters', JSON.stringify([{char: '', mode: ''}]));

        this.props.clearStatistics();
    }

    // handle change of checkboxes status and mode for future test changes
    handleChange = (e) => {
        // visualisation of which alphabet(s) was selected
        e.currentTarget.parentElement.classList.toggle('checked');

        const selectedMode = e.currentTarget.value;
        let modes = this.state.modes;

        // add changed checkbox's mode to modes list if it wasn't checked before change and delete it from the list if it was on it
        !modes.includes(selectedMode) ? modes.push(selectedMode) : modes = modes.filter(mode => mode !== selectedMode);

        const msg = this.createMessage(modes);

        this.setState(
            {
                modes: modes,
                message: msg
            }
        );
    }

    // render message accordigly to users choice of alphabet(s)
    createMessage = (modes) => {
        const hiraganaSelected = modes.includes('hiragana');
        const katakanaSelected = modes.includes('katakana');

        const alphabet = this.selectAlphabet(hiraganaSelected, katakanaSelected);

        return alphabet ? `You will get ${alphabet} quiz` : this.defaultMessage;
    }

    selectAlphabet = (hir, kat) => {
        if (hir && kat) {
            return 'hiragana and katakana';
        } else if (hir) {
            return 'hiragana';
        } else if (kat) {
            return 'katakana';
        }
        return '';
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        
        // if at least one alphabet was selected allow test rendering and create cards with the array of modes (inside AlphabetsTest)
        if (this.state.modes.length) {
            this.props.switchToTest(this.state.modes);
            
            // change history object (change URL and update BrowserRouter) to switch to the first question of the quiz
            this.props.history.push('/alphabets/test/q/1');
        }
    }
    
    render() {
        return (
            <div className="quiz-start-panel">
                <form
                    onSubmit={this.handleSubmit}
                >
                    <div className="quiz-options">
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
                    </div>

                    {/* message about which alphabet was selected */}
                    <span className="msg-quiz-start">{this.state.message}</span>
                    
                    <button type="submit" className="quiz-start-btn">Start</button>
                </form>
            </div>
        );
    }
}

export default withRouter(ChoicePanel);