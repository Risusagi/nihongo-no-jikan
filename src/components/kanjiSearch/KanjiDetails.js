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
            characterData: data,
            playing: false
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

        this.props.resetKanjiSearch();
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
                onEnded={() => this.setState({playing: false})}
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

    // play or pause kanji drawing process video
    handleVideoPlay = () => {
        if (!this.state.playing) {
            document.querySelector('video').play();
        } else {
            document.querySelector('video').pause();
        }

        this.setState(prevState => ({
            playing: !prevState.playing
        }));
    }

    render() {
        if (this.state.characterData) {
            const { kanji, radical, references, examples } = this.state.characterData;
            
            const meaningForm = kanji.meaning.english.indexOf(',') === -1 ? 'meaning' : 'meanings';

            return (
                <div className="kanji-details">
                    <div className="details-container">
                        <div className="kanji">{kanji.character}</div>

                        <table className="kanji-details-table">
                            <tbody>
                                <tr>
                                    <th>on</th>
                                    <td>
                                        {kanji.onyomi.katakana} 
                                        <span className="romaji-transcription"> ({kanji.onyomi.romaji})</span>
                                    </td>    
                                </tr>
                                <tr>
                                    <th>kun</th>
                                    <td>
                                    {kanji.kunyomi.hiragana}
                                    <span className="romaji-transcription"> ({kanji.kunyomi.romaji})</span>
                                    </td>
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
                    </div>

                    <div className="drawing-steps">
                        <div 
                            className={`video ${this.state.playing ? 'playing' : ''}`}
                        >
                            {this.renderVideo(kanji.video)}

                            <div className="play-pause-btn">
                                <svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={this.handleVideoPlay}>
                                    {
                                        this.state.playing ? (
                                            <>
                                                <rect width="4" height="12" x="6" y="6" />
                                                <rect width="4" height="12" x="14" y="6" />
                                            </>
                                        ) : (
                                            <path d="M19 12L8 19V5z" />
                                        )
                                    }
                                </svg>
                            </div>
                        </div>

                        {this.renderDrawingSteps(kanji.strokes.images)}
                    </div>
                    
                    <span className="caption">Examples</span>
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