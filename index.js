
const videoPlayer = document.getElementById('video');
const outputElem = document.getElementById('output');
const urlRoot = "./videos/";
const videoData=[
	{
		src:"a_large_rock_waterfall.mp4",
		annotations:[
			{
				className: "intro",
				data: [{start:1, stop:4, content: "Video coding for Newsela!!!"}]
			},
			{
				className: "below",
				data: [{start:5, stop:7, content: "Hello!"}, {start:8, stop:10, content:"This is Bret!"}, {start:10, stop:14, content:"Welcome, friends!"}]
			}
		]
	},{
		src:"octopus_thanked_me.mp4",
		annotations:[
			{
				className: "intro",
				data: [{start:1, stop:4, content: "An octopus thanked somebody?"}]
			},
			{
				className: "notes",
				data: [{start:10, stop:14, content: "Oh no, so sad!"}, {start:50, stop:60, content: "Do you think she's ok?"}, {start:85, stop:88, content:"Hmm, where's she going?"}, {start:115, stop:125, content:"???"},{start:140, stop:150, content:"friends are everywhere!"}]
			},
			{
				className: "intro",
				data: [ {start:74, stop:82, content: "...is it me, or were those annotations weak?"}]
			}
		]
	},{
		src:"summer_flower.mp4",
		annotations:[
			{
				className: "intro",
				data: [{start:1, stop:4, content: "Just some flowers in the sun."} ]
			},
			{
				className: "notes",
				data: [ {start:6, stop:12, content:"You are capable of achieving your dreams!"}]
			}
		]
	},{
		src:"et_the_walrus.mp4",
		annotations:[
			{
				className: "intro",
				data: [{start:1, stop:4, content: "Walruses are capable of some amazing sounds!"} ]
			},
			{
				className: "notes",
				data: [{start:2, stop:4, content: "Speak!"}, {start:4, stop:6, content: "Roar!"}, {start:9, stop:12, content: "Cluck!"}, {start:12, stop:15, content: "Growl..."}, {start:17, stop:19, content: "Sputter!"}, {start:22, stop:24, content: "Grumble."}, {start:25, stop:27, content: "Whistle!"}, {start:28, stop:32, content: "Bell, or bellow? idk!"}]
			},
			{
				className: "upperRight",
				data: [{start:32, stop:35, content: "He's quite charming, no?"} ]
			},
		]
	},{
		src:"sloth_goes_for_a_ride.mp4",
		annotations:[
			{
				className: "intro",
				data: [{start:1, stop:10, content: "A sloth goes for a ride!"} ]
			},
			{
				className: "upperRight",
				data: [{start:55, stop:70, content:"Weeeee!"}, {start:105, stop:115, content:"Hello everyone, I'm back!"}, {start:105, stop:115, content:"What a champ!"}]
			}
		]
	}
];


class Annotation {
    constructor(output, trackNum, annoTrackNum, start, stop, content) {
    	this.outputEl;
    	this.trackNum = trackNum;
    	this.annoTrackNum = annoTrackNum;
        this.start = start;
        this.stop = stop;
        this.content= content || "Thank you";
        this.visible = false;
    }
    show(el) {
        console.log("Track "+this.trackNum+" Anno show", this.start, this.stop, this.content);
    	el.innerHTML=this.content;
    	el.style.opacity="100%";
    	this.visible=true;
    	//debugger;
    }
   	hide(el) {
        console.log("Track "+this.trackNum+" Anno hide", this.start, this.stop, this.content);
    	el.style.opacity="0%";
    	el.innerHTML="";
    	this.visible=false;
    }
}



class AnnotationPlayer {
    constructor(videoElement, ouputElement, videoData) {
    	this.el=videoElement;
    	this.out=ouputElement;
    	this.outputNodes=[];
    	this.rawData=videoData;

    	
    	this.state = {
			queue: 0,	
			status: 'pause',
			time: 0
	    };

    	this.attachEvents(this.el);
    	//debugger;
    	this.tracks=this.getTracks(this.rawData);
    	this.el.src=urlRoot+this.tracks[0].src;
    	this.addOutputNodes();
    	//this.attachSources(this.el, urlRoot);
    }
    getTracks(data)
    { //debugger;
		const trx = [];
		for (let [i, track] of data.entries()){
			trx[i] = {};
			trx[i].queue=i;
			trx[i].src=track.src;
			trx[i].annos = [];
			for (let [ii, annTrack] of track.annotations.entries()){
				let newAnnoTrack = {};
				newAnnoTrack.className=track.annotations[ii].className || "";
				newAnnoTrack.element=null;
				newAnnoTrack.data=[];
				for (let a of annTrack.data) newAnnoTrack.data.push(new Annotation(this.out, i, ii, a.start, a.stop, a.content));
				trx[i].annos.push(newAnnoTrack);
			}
		}
		console.log("Tracks assembled!", trx);
		return trx;
	}
    handleTimeUpdate(t)
    {	
		for (let ant of this.tracks[this.state.queue].annos) {
			let el = ant.element;
			for (let a of ant.data) {
				a.visible ? t >= a.stop && a.hide(el):(t <= a.stop && t >= a.start) && a.show(el);		
			}
		}
	}
	playNextVideo()
	{
		this.addOutputNodes();
		this.el.src=urlRoot+this.tracks[this.state.queue].src;
		this.el.play();
		this.state.status="play";
	}
	addOutputNodes()
	{
		// remove children from output
		while (this.out.firstChild) this.out.removeChild(this.out.firstChild);
		this.outputNodes=[];
		// for each annotation track...
		let annos = this.tracks[this.state.queue].annos;
		for (let track in annos ){
			//debugger;
			let el=document.createElement('div');
			el.className += ("annotation "+annos[track].className);
			this.out.appendChild(el);
			this.outputNodes.push(el);
			annos[track].element = el;
		}

		// create a div 

		// append it to output 
		//output.appendChild()

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
	videoData
);
