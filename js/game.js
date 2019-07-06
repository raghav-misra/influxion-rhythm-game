// Load Path Dynamically Later On
var path = "maps/onestop.json"
var map = {
	error: true
}
var spikesData = []
var spikes = []
var beatStage = 0
var timeUntilNextBeat = 0
// loadMap(path) // loads the map data
function loadMap(path) {
	load(path, function(data) {
		loadGame(data)
	})
}

function loadGame(data) {
	map = data
	map.beats.notes.forEach(function(note) {
		spikesData.push(note)
	})
	music.src = "maps/" + map.info.path
	music.on("load", function() {
		music.play()
		spikeManager()
	})
	setInterval(update, 1000 / 60); // 60FPS
}
// Create & Manage Spikes
function createSpike() {
	var spike = new Konva.RegularPolygon({ // Render Spikes
		x: 800,
		y: 100,
		sides: 3,
		radius: 20,
		fill: 'white'
	});
	var drop = new Konva.Tween({
		node: spike,
		x: 800,
		y: 545,
		duration: 1,
		easing: Konva.Easings.EaseIn,
		onFinish: function() {
			spikes.push(spike)
		}
	});
	spikes.push(spike)
	mainLayer.add(spike)
	drop.play()
}

function spikeManager() { // Sync Spikes To Beats
	var currentTime = music.seek()
	var nextBeatTime = parseFloat(toFixed(map.beats.notes[beatStage].time, 2))
	timeUntilNextBeat = nextBeatTime - currentTime - 5.5 // Time until next beat - approx6secs (spike loading time)
	beatStage++
	setTimeout(function() {
		createSpike()
		spikeManager()
	}, timeUntilNextBeat * 1000) //seconds to miliseconds
}

// Reusable Code - utils
function load(path, success, error) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				if (success) success(JSON.parse(xhr.responseText));
			} else {
				if (error) error(xhr);
			}
		}
	};
	xhr.open("GET", path, true);
	xhr.send();
}

function toFixed(num, fixed) {
	var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
	return num.toString().match(re)[0];
}