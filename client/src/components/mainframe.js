import React from 'react';
import AudioService from './../audio/audio';

export default class MainFrame extends React.Component {

    constructor(props) {
        super(props);

        this.audioService = new AudioService([
            "http://localhost:3000/music/rhcp",
            "http://localhost:3000/music/hives",
            "http://localhost:3000/music/pz",
            "http://localhost:3000/music/vagina"
        ]);
        
        

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
        return(
            <div>
                <button onClick={this.pause.bind(this)}>Pause</button>
                <button onClick={this.play.bind(this)}>Play</button>
                <button onClick={this.stop.bind(this)}>Stop</button>
                <button onClick={this.next.bind(this)}>Next</button>
                <button onClick={this.prev.bind(this)}>Prev</button>
            </div>
        );
    }

}