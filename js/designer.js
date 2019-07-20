var mapStruct = {
	"online": true,
	"info": {
		"levelName": "New Influxion Level",
		"songName": "Good Song",
		"path": "theSong.mp3",
		"background": "",
		"starScores": [0, 0, 0],
		"noteColor": "white"
	},
	"effects": [], // Useless placeholder
	"texts": {
		"text": [
			{
				"value": "New Influxion Level By 'Anonymous'", // Level Name
				"fontSize": 80,
				"fontFamily": "Oswald",
				"fill": "white",
				"x": 100,
				"y": 100
			},
			{
				"value": "Song 'Good Song' by 'Anonymous", // Level Subtitle
				"fontSize": 20,
				"fontFamily": "Oswald",
				"fill": "white",
				"x": 100,
				"y": 200
			}, 
		]
	},
	"beats": {
		"notes": []
	}
}

function buildComplete(){
	var levelName = document.getElementById("levelNameBox").value.trim() || "New Influxion Level";
	var songName = document.getElementById("songNameBox").value.trim() || "Good Song";
	var userName = document.getElementById("userNameBox").value.trim() || "Anonymous";
	var artistName = document.getElementById("artistNameBox").value.trim() || "Anonymous";
	if(levelName.length > 29){
		alert('Your level name can not be over 29 characters')
		return;
	}
	mapStruct.info.levelName = levelName.toLowerCase();
	mapStruct.info.songName = songName;
	mapStruct.texts.text[0].value = mapStruct.texts.text[0].value.replace("New Influxion Level", levelName).replace("Anonymous", userName);
	mapStruct.texts.text[1].value = mapStruct.texts.text[1].value.replace("Good Song", songName).replace("Anonymous", artistName);
	compileJSON(mapStruct, songInput.files[0]);
}

var createBeatBool = false;

function addBeat(event){
	if(!createBeatBool) return;
	var note = {
	}
	if(event.code == "KeyC"){
		note.time = wavesurfer.getCurrentTime();
		document.getElementById('clef').style.color = "white"
		document.getElementById('note').style.color = "#27ae60"
		document.getElementById('note').style.transform = "scale(1.2,1.2)"
		setTimeout(function(){
			document.getElementById('note').style.transform = "scale(1,1)"
		},500)
	}
	else if(event.code == "KeyX"){
		note.time = wavesurfer.getCurrentTime();
		note.type = "attack";
		document.getElementById('note').style.color = "white"
		document.getElementById('clef').style.color = "#27ae60"
		document.getElementById('clef').style.transform = "scale(1.2,1.2)"
		setTimeout(function(){
			document.getElementById('clef').style.transform = "scale(1,1)"
		},500)
	}
	else return;
	mapStruct.beats.notes.push(note);
}

function songUpdate(){
	if(wavesurfer.getCurrentTime() >= wavesurfer.getDuration() && wavesurfer.getCurrentTime() != 0){
		if(mapStruct.beats.notes.length == 0){
			alert("Your Map Can't be empty! Please try again")
			location.reload()
			return;
		}
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
	document.getElementById("popup").classList.remove("hide");
}

var wavesurfer = WaveSurfer.create({
	container: '#waveform',
	waveColor: 'white',
	progressColor: 'rgb(33, 47, 59)'
});

wavesurfer.on('ready', ()=>{
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
	var color2 = color.replace("#", "");
	mapStruct.info.background = "https://dummyimage.com/1920x1080/" + color2 + "/" + color2;
}
