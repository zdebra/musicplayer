
export default class AudioService {

    constructor(songsURIs) {

        this.songsURIs = songsURIs;
        this.context = null;
        this.sourceNode = null;
        this.buffer = null;

        this.paused = true;
        this.stopped = true;
        this.repeat = false;
        this.autoplay = false;
        this.volume = 1;
        this.shuffle = false;

        this.songIndex = 0;
        this.songCount = null;

        this.elapsed = 0;
        this.lastCalculated = 0;

        try {

            if (this.songsURIs === undefined || (this.songCount = this.songsURIs.length) < 1) {
                throw new Error("At least one song must be provided");
            }

            window.AudioContext = window.AudioContext||window.webkitAudioContext;
            this.context = new AudioContext();
            if(this.autoplay) {
                this.load(this.songsURIs[this.songIndex]);
            }
            setInterval(() => {
                this.loop();
            },125);

        }
        catch(e) {
            console.log(e);
        }

    }

    loop() {
        var now = Date.now();
        if(!this.paused) {
            this.elapsed += now - this.lastCalculated;
        }
        this.lastCalculated = now;
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


            if (this.paused) {
                this.sourceNode.start(0, this.getCurrentTime());
            }
            else {
                this.sourceNode.start(0);
            }

            this.paused = false;
            this.stopped = false;

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
        this.stopped = true;
        this.counter = 0;

    }

    pause() {

        this.sourceNode.stop(0);
        this.paused = true;
    }

    getProgress() {
        if(this.buffer === null) {
            return 0;
        }

        var percent = (this.getCurrentTime()/this.getDuration())*100;

        console.log(percent);
        return percent;
    }

    getDuration() {
        if(this.buffer === null) {
            return 0;
        }
        return this.buffer.duration;
    }

    getCurrentTime() {
        return this.elapsed/1000;
    }


}