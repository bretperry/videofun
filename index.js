import videos from 'video';

console.log(videos);
const videoPlayer = document.getElementById('video');

class Video {
    constructor(name, track) {
        this.name = name;
        this.track = track;
    }
    getName() {
        return this.name;
    }
}
class Annotation {
    constructor(start, stop, content) {
        this.start = start;
        this.stop = stop;
        this.content= content || 
    }
    show() {
        console.log("show");
    }
   	hide() {
        console.log("show");
    }
}

videoPlayer.on('timeUpdate', function(event) {

	debugger;

});