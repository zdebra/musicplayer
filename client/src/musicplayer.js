import React from 'react';
import AudioService from './audio';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ProgressBar from 'react-bootstrap/lib/ProgressBar';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

export default class MusicPlayer extends React.Component {

    constructor(props) {
        super(props);

        if(this.props.musicList === undefined) {
            throw new Error("Music list must be provided");
        }

        this.audioService = new AudioService(this.props.musicList);

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

    timeToRead(value) {
        // value in miliseconds
        let seconds = Math.round(value/1000);
        let minutes = Math.floor(seconds/60);
        let secondsLeft = seconds - (minutes*60);
        if(secondsLeft < 10) {
            secondsLeft = `0${secondsLeft}`;
        }
        return `${minutes}:${secondsLeft}`;
    }

    render() {

        var bLabel = (this.audioService.stopped || this.audioService.paused) ? <span className="glyphicon glyphicon-play" aria-hidden="true"/> : <span className="glyphicon glyphicon-pause" aria-hidden="true"/>;

        var cur = this.audioService.getCurrentTime();
        var final = this.audioService.getDuration();
        var left = this.audioService.getDuration() - this.audioService.getCurrentTime();
        var songName = this.audioService.getCurrentSongName();

        return(

            <div>
                {songName}
                <ProgressBar now={this.state.progress} bsStyle="info" onClick={this.progressClick.bind(this)}/>
                <ButtonToolbar>
                    <ButtonGroup bsSize="small">
                        <Button onClick={this.playPause.bind(this)}>{bLabel}</Button>
                        <Button onClick={this.prev.bind(this)}><span className="glyphicon glyphicon-step-backward" aria-hidden="true"/></Button>
                        <Button onClick={this.next.bind(this)}><span className="glyphicon glyphicon-step-forward" aria-hidden="true"/></Button>
                        <Button onClick={this.stop.bind(this)}><span className="glyphicon glyphicon-stop" aria-hidden="true"/></Button>
                    </ButtonGroup>
                </ButtonToolbar>
                <div>
                    Current time: {this.timeToRead(cur)}<br/>
                    Final time: {this.timeToRead(final)}<br />
                    Time left: {this.timeToRead(left)} <br/>
                </div>
            </div>
        );
    }

}