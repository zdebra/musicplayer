
export default class AudioService {

    constructor(songsURIs) {

        this.songsURIs = songsURIs;
        this.context = null;
        this.sourceNode = null;
        this.buffer = null;

        this.paused = false;
        this.pausedAt = null;
        this.stopped = false;
        this.repeat = false;
        this.autoplay = false;
        this.volume = 1;
        this.startedAt = null;
        this.shuffle = false;

        this.songIndex = 0;
        this.songCount = null;


        try {

            if (this.songsURIs === undefined || (this.songCount = this.songsURIs.length) < 1) {
                throw new Error("At least one song must be provided");
            }

            window.AudioContext = window.AudioContext||window.webkitAudioContext;
            this.context = new AudioContext();
            if(this.autoplay) {
                this.load(this.songsURIs[this.songIndex]);
            }

        }
        catch(e) {
            console.log(e);
        }

    }


    load(url) {

        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        request.onload = () => {
            this.context.decodeAudioData(request.response, (buffer) => {
                this.buffer = buffer;
                this.play();

                // on song end
                this.sourceNode.onended = () => {
                    if(!this.paused && !this.stopped) {
                        this.next();
                    }
                }

            }, (e) => {
                console.log('onBufferError', e);
            });
        };
        request.send();

    }


    play() {

        if(this.buffer===null) {
            this.load(this.songsURIs[this.songIndex]);
        } else {

            this.sourceNode = this.context.createBufferSource();
            this.sourceNode.connect(this.context.destination);
            this.sourceNode.buffer = this.buffer;
            this.paused = false;
            this.stopped = false;

            if (this.pausedAt) {
                this.startedAt = Date.now() - this.pausedAt;
                this.sourceNode.start(0, this.pausedAt / 1000);
            }
            else {
                this.startedAt = Date.now();
                this.sourceNode.start(0);
            }
        }

    }


    next() {
        if(this.songIndex < this.songCount-1) {
            this.songIndex++;
        } else {
            this.songIndex = 0;
        }
        this.stop();
        this.load(this.songsURIs[this.songIndex]);

    }

    prev() {
        if(this.songIndex === 0) {
            this.songIndex = this.songCount - 1;
        } else {
            this.songIndex--;
        }
        this.stop();
        this.load(this.songsURIs[this.songIndex]);

    }

    stop() {
        this.sourceNode.stop();
        this.paused = false;
        this.pausedAt = null;
        this.stopped = true;

    }

    pause() {
        this.sourceNode.stop(0);
        this.pausedAt = Date.now() - this.startedAt;
        this.paused = true;
    }


}