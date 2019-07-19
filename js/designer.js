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

var step1 = document.getElementById("step1");
var step2 = document.getElementById("step2");
var songInput = document.getElementById('get-song');

document.getElementById("choose-song").onclick = ()=>{
	songInput.click();
};

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
