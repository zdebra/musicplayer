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

        var bLabel = (this.audioService.stopped || this.audioService.paused) ? <span className="glyphicon glyphicon-play" aria-hidden="true"/> : <span className="glyphicon glyphicon-pause" aria-hidden="true"/>;

        return(

            <div>
                <ProgressBar now={this.state.progress} bsStyle="info" onClick={this.progressClick.bind(this)}/>
                <ButtonToolbar>
                    <ButtonGroup bsSize="small">
                        <Button onClick={this.pause.bind(this)}><span className="glyphicon glyphicon-pause" aria-hidden="true"/></Button>
                        <Button onClick={this.play.bind(this)}><span className="glyphicon glyphicon-play" aria-hidden="true"/></Button>
                        <Button onClick={this.stop.bind(this)}><span className="glyphicon glyphicon-stop" aria-hidden="true"/></Button>
                        <Button onClick={this.next.bind(this)}><span className="glyphicon glyphicon-step-forward" aria-hidden="true"/></Button>
                        <Button onClick={this.prev.bind(this)}><span className="glyphicon glyphicon-step-backward" aria-hidden="true"/></Button>
                        <Button onClick={this.playPause.bind(this)}>{bLabel}</Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </div>
        );
    }

}