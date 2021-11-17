
const videoPlayer = document.getElementById('video');
const urlRoot = "./videos/";
const videoData=[
	{
		src:"a_large_rock_waterfall.mp4",
		annotations:[
			{
				className: "waterfall",
				data: [{start:1, stop:4, content: "Waterfall!"}, {start:10, stop:14}]
			},
			{
				className: "standard",
				data: [{start:4, stop:8, content: "Hello!"}, {start:12, stop:16}, {start:20, stop:24}]
			}
		]
	},{
		src:"octopus_thanked_me.mp4",
		annotations:[
			{
				className: "main",
				data: [{start:1, stop:4, content: "Octopus!"}, {start:18, stop:20}, {start:60, stop:64}, {start:100, stop:120}, {start:40, stop:44}, {start:46, stop:50}]
			},
			{
				className: "notes",
				data: [ {start:10, stop:14}, {start:20, stop:24}]
			}
		]
	},{
		src:"summer_flower.mp4",
		annotations:[
			{
				className: "main",
				data: [{start:1, stop:4, content: "Flowers!"}, {start:10, stop:14}, {start:20, stop:24}]
			},
			{
				className: "notes",
				data: [{start:10, stop:14}, {start:20, stop:24}]
			}
		]
	},{
		src:"et_the_walrus.mp4",
		annotations:[
			{
				className: "main",
				data: [{start:1, stop:4, content: "Walrus!"}, {start:14, stop:18} ]
			},
			{
				className: "notes",
				data: [{start:10, stop:14}, {start:20, stop:24}]
			}
		]
	},{
		src:"sloth_goes_for_a_ride.mp4",
		annotations:[
			{
				className: "main",
				data: [{start:1, stop:4, content: "Sloth!"}, {start:12, stop:14}, {start:24, stop:26}]
			},
			{
				className: "notes",
				data: [{start:10, stop:14}, {start:20, stop:24}]
			}
		]
	}
];


class Annotation {
    constructor(trackNum, start, stop, content) {
    	this.trackNum = trackNum;
        this.start = start;
        this.stop = stop;
        this.content= content || "Thank you";
        this.visible = false;
    }
    show() {
        console.log("Track "+this.trackNum+" Anno show", this.start, this.stop, this.content);
    	this.visible=true;
    }
   	hide() {
        console.log("Track "+this.trackNum+" Anno hide", this.start, this.stop, this.content);
    	this.visible=false;
    }
}

const getTracks = (data) => {
	const trx = [];
	for (let [i, track] of data.entries()){
		trx[i] = {};
		trx[i].queue=i;
		trx[i].src=track.src;
		trx[i].annos = [];
		for (let [ii, annTrack] of track.annotations.entries()){
			let newAnnoTrack = {};
			newAnnoTrack.className=track.annotations[ii].className || "";
			newAnnoTrack.data=[];
			for (let a of annTrack.data) newAnnoTrack.data.push(new Annotation(i, a.start, a.stop));
			trx[i].annos.push(newAnnoTrack);
		}
	}
	console.log("Tracks assembled!", trx);
	return trx;
}

class AnnotationPlayer {
    constructor(videoElement, ouputElement, tracks) {
    	this.el=videoElement;
    	this.out=ouputElement;
    	this.tracks = tracks;
    	this.state = {
			queue: 0,	
			status: 'pause',
			time: 0
	    };
    	this.attachEvents(this.el);
    	this.attachSources(this.el, urlRoot);
    }
    handleTimeUpdate(t)
    {	
		for (let anno_track of this.tracks[this.state.queue].annos) {
			for (let a of anno_track.data) {
				a.visible ? t >= a.stop && a.hide():(t <= a.stop && t >= a.start) && a.show();		
			}
		}
	}
	playNextVideo()
	{
		this.el.src=urlRoot+this.tracks[this.state.queue].src;
		this.el.play();
		this.state.status="play";
	}
	attachSources(vidEl, urlRoot)
	{	
		for (let track of this.tracks){
			let s = document.createElement("source");
			s.src = urlRoot + track.src;
			s.type = "video/mp4";
			console.log(s);
			vidEl.appendChild(s);
		}
		console.log("Sources added!");
	}
	attachEvents(){
	    this.el.ontimeupdate = evt => this.handleTimeUpdate(this.el.currentTime, evt);
	    this.el.onended = () => {
	    	if (++this.state.queue < this.tracks.length) this.playNextVideo();
	    	else console.log("Videos Finished! Thanks for watching!");
	    };
	}
}

const player = new AnnotationPlayer(
	document.getElementById("video"), 
	document.getElementById("output"), 
	getTracks(videoData)
);
