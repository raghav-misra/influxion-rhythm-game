/*
var sound = document.getElementById('sound');
var map = []
document.body.onkeypress = function(key) {
	if (key.code == "KeyV") {
		var note = {
			time: wavesurfer.getCurrentTime()
		}
		document.getElementById('status').innerText = "Saved"
		map.push(note)
		document.getElementById('export').innerText = JSON.stringify(map)
		setTimeout(function() {
			document.getElementById('status').innerText = ""
		}, 400)
	}
	if (key.code == "KeyC") {
		var note = {
			time: wavesurfer.getCurrentTime(),
			type: "attack"
		}
		document.getElementById('status').innerText = "Saved"
		map.push(note)
		document.getElementById('export').innerText = JSON.stringify(map)
		setTimeout(function() {
			document.getElementById('status').innerText = ""
		}, 400)
	}
}
var wavesurfer = WaveSurfer.create({
	container: '#waveform',
	waveColor: 'white',
	progressColor: 'purple'
});
var input = document.getElementById('input')
input.onchange = function(e) {
	wavesurfer.on('ready', function() {
		wavesurfer.play();
	});
	wavesurfer.load(URL.createObjectURL(this.files[0]))
	sound.onend = function(e) {
		URL.revokeObjectURL(this.src);
	}
}
*/

var customBeatMap = []

var createBeatBool = false;

function addBeat(event){
	if(!createBeatBool) return;
	var note = {
	}
	if(event.code == "KeyN"){
		note.time = wavesurfer.getCurrentTime();
	}
	else if(event.code == "KeyC"){
		note.time = wavesurfer.getCurrentTime();
		note.type = "attack";
	}
	else return;
	customBeatMap.push(note);
}

function songUpdate(){
	if(wavesurfer.getCurrentTime() >= wavesurfer.getDuration() && wavesurfer.getCurrentTime() != 0){
		wavesurfer.stop();
		createBeatBool = false;
		step3.getElementsByClassName("input-text")[0].innerHTML = "finished";
		step3.classList.add("disabled");
		step4.classList.remove("disabled");
		step4.disabled = false;
		step4.style.animation = "color-change-background 7.5s ease-in-out infinite";
	}
	setTimeout(songUpdate, 500);
}

var step1 = document.getElementById("step1");
var step2 = document.getElementById("step2");
var step3 = document.getElementById("step3");
var step4 = document.getElementById("step4");

var songInput = document.getElementById('get-song');
var backgroundInput = document.getElementById("get-background");

document.getElementById("choose-song").onclick = ()=>{
	songInput.click();
};

document.getElementById("choose-background").onclick = ()=>{
	backgroundInput.click()
};

step4.onclick = ()=>{
	step4.style.animation = "none";
}

var wavesurfer = WaveSurfer.create({
	container: '#waveform',
	waveColor: 'white',
	progressColor: 'rgb(33, 47, 59)'
});

wavesurfer.on('ready', ()=>{
	document.getElementById("instruct").classList.add("hide");
	wavesurfer.play();
	songUpdate();
	createBeatBool = true;
});

document.getElementById("choose-beats").onclick = ()=>{
	wavesurfer.load(URL.createObjectURL(songInput.files[0]));
	step3.getElementsByClassName("input-text")[0].innerHTML = "in progress";
}

songInput.onchange = ()=>{
	var songName = songInput.value.toLowerCase().replace("c:\\fakepath\\", "");
	if(!songName.endsWith(".mp3") && !songName.endsWith(".wav")){
		alert("Whoops! That file is invalid!");
		return;
	}
	step1.getElementsByClassName("song-text")[0].innerHTML = songName;
	step1.classList.add("disabled");
	step2.classList.remove("disabled");
}

backgroundInput.onchange = ()=>{
	var color = backgroundInput.value.toLowerCase();
	step2.getElementsByClassName("background-text")[0].innerHTML = color;
	step2.getElementsByClassName("background-text")[0].style.color = color;
	step2.classList.add("disabled");
	step3.classList.remove("disabled");
}
