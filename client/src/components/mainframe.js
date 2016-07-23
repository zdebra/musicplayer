import React from 'react';
import AudioService from './../audio/audio';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ProgressBar from 'react-bootstrap/lib/ProgressBar';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

export default class MainFrame extends React.Component {

    constructor(props) {
        super(props);

        this.audioService = new AudioService([
            "http://localhost:3000/music/rhcp",
            "http://localhost:3000/music/hives",
            "http://localhost:3000/music/pz",
            "http://localhost:3000/music/vagina"
        ]);

        this.state = {progress: this.audioService.getProgress()};
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        setInterval(this.tick,250);
    }

    tick() {
        this.setState({progress: this.audioService.getProgress()});
    }


    pause() {
        this.audioService.pause();
    }

    play() {
        this.audioService.play();
    }

    stop() {
        this.audioService.stop();
    }

    next() {
        this.audioService.next();
    }

    prev() {
        this.audioService.prev();
    }

    playPause() {
        if(this.audioService.stopped || this.audioService.paused) {
            this.audioService.play();
        }
        else {
            this.audioService.pause();
        }
    }

    progressClick(e) {

        let x = e.pageX - e.target.offsetLeft;
        let elWidth = e.target.offsetWidth;

        let posPercent = x/elWidth;

        this.audioService.jumpTo(this.audioService.getDuration()*posPercent);

    }

    render() {

        var divStyle = {
            'marginLeft': '300px',
            'marginRight': '100px'
        }

        var bLabel = (this.audioService.stopped || this.audioService.paused) ? "play" : "pause";

        return(

            <div>
                <ProgressBar now={this.state.progress} bsStyle="info" onClick={this.progressClick.bind(this)}/>
                <ButtonToolbar>
                    <ButtonGroup bsSize="xsmall">
                        <Button onClick={this.pause.bind(this)}>Pause</Button>
                        <Button onClick={this.play.bind(this)}>Play</Button>
                        <Button onClick={this.stop.bind(this)}>Stop</Button>
                        <Button onClick={this.next.bind(this)}>Next</Button>
                        <Button onClick={this.prev.bind(this)}>Prev</Button>
                        <Button onClick={this.playPause.bind(this)}>{bLabel}</Button>
                    </ButtonGroup>
                </ButtonToolbar>
                <div style={divStyle}>
                    <ProgressBar now={this.state.progress} bsStyle="info" onClick={this.progressClick.bind(this)}/>
                </div>
            </div>
        );
    }

}