import React from 'react';
import AudioService from './../audio/audio';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ProgressBar from 'react-bootstrap/lib/ProgressBar';

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

    render() {
/*
        var p = 0;
        setInterval(()=> {
            p = this.audioService.getProgress();
        },500);
*/
        return(
            <div>
                <ProgressBar now={this.state.progress} label={`${this.state.progress}%`} />
                <ButtonToolbar>
                    <Button bsStyle="primary" onClick={this.pause.bind(this)}>Pause</Button>
                    <Button bsStyle="primary" onClick={this.play.bind(this)}>Play</Button>
                    <Button bsStyle="primary" onClick={this.stop.bind(this)}>Stop</Button>
                    <Button bsStyle="primary" onClick={this.next.bind(this)}>Next</Button>
                    <Button bsStyle="primary" onClick={this.prev.bind(this)}>Prev</Button>
                </ButtonToolbar>
            </div>
        );
    }

}