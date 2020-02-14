import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import kanjiAlive from './kanjiAlive';
import ExamplesTable from './ExamplesTable';

class KanjiDetails extends Component {
    constructor(props) {
        super(props);
        
        // select kanji that was selected from all that were found
        const data = this.props.allCharacters.find(char => char.kanji.character === this.props.match.params.kanji);

        this.state = {
            characterData: data
        }
    }

    componentDidMount = async () => {
        // send request for data if it wan't get from the search page
        // for example if user typed page URL manualy
        if (!this.state.characterData) {
            const result = await kanjiAlive.get(`/kanji/${this.props.match.params.kanji}`);
            
            this.setState({
                characterData: result.data
            });
        }
    }

    // render video element with source tags for all available versions of video format except poster
    // poster is used as a poster image
    renderVideo = (videoData) => {
        const versions = Object.keys(videoData).filter(key => key !== 'poster');

        const sources = versions.map(version => {
            return <source src={videoData[version]} type={`video/${version}`} key={version} />
        });

        return (
            <video
                poster={videoData.poster}
            >
                {sources}
            </video>
        );
    }

    // render images that show steps of how kanji should be drawn
    renderDrawingSteps = (steps) => {
        return steps.map((step, index) => {
            return <img src={step} alt='' key={index} />
        })
    }

    render() {
        if (this.state.characterData) {
            const { kanji, radical, references, examples } = this.state.characterData;
            
            const meaningForm = kanji.meaning.english.indexOf(',') === -1 ? 'meaning' : 'meanings';

            return (
                <div>
                    <span>{kanji.character}</span>

                    <table>
                        <tbody>
                            <tr>
                                <th>on</th>
                                <td>{kanji.onyomi.katakana}</td>    
                            </tr>
                            <tr>
                                <th>kun</th>
                                <td>{kanji.kunyomi.hiragana}</td>
                            </tr>
                            <tr>
                                <th>radical</th>
                                <td>{radical.character}</td>
                            </tr>
                            <tr>
                                <th>{meaningForm}</th>
                                <td>
                                    {kanji.meaning.english}
                                </td>
                            </tr>
                            <tr>
                                <th>grade</th>
                                <td>{references.grade}</td>
                            </tr>
                            <tr>
                                <th>strokes</th>
                                <td>{kanji.strokes.count}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div>
                        {this.renderVideo(kanji.video)}
                        {this.renderDrawingSteps(kanji.strokes.images)}
                    </div>
                    
                    <ExamplesTable examples={examples} />
                </div>
            );
        } else {
            return (
                <>
                    spiner
                </>
            );
        }
    }
};

export default withRouter(KanjiDetails);