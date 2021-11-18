
const videoPlayer = document.getElementById('video');
const outputElem = document.getElementById('output');
const urlRoot = "./videos/";



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
				a.visible ? ( t >= a.stop|| t < a.start) && a.hide(el):(t <= a.stop && t >= a.start) && a.show(el);		
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
	videoPlayer, 
	outputElem,
	videoData
);
