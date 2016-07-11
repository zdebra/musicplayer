import RestClient from 'node-rest-client';


export default class AudioService {

    constructor(songsURIs) {
        var _context = null;
        var _source = null;

        try {
            // Fix up for prefixing
            window.AudioContext = window.AudioContext||window.webkitAudioContext;
            this._context = new AudioContext();
            this._source = this._context.createBufferSource();
        }
        catch(e) {
            alert('Web Audio API is not supported in this browser');
        }

        this.restClient = new RestClient.Client();


        this.restClient.get("http://localhost:3000/music/rhcp", (data) => {
            console.log(data);

            this.loadSong(data.buffer);
        });

    }


    loadSong(arrayBuffer) {


        this._context.decodeAudioData(arrayBuffer, (buffer) => {
            this._source.buffer = buffer;
            this._source.connect(this._context.destination);
            this.play();

        });

    }

    play() {
        this._source.start();
    }

    pause() {
        this.source.pause();
    }

    next() {

    }

    prev() {

    }

    jumpTo(time) {

    }

    stop() {

    }

}