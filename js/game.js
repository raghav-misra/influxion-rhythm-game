//load path dynamicly later

var path = "maps/onestop.json"
var map = {
	error: true
}
var textmap = []
var spikesData = []
var spikes = []
var enemies = []
var beatStage = 0
var timeUntilNextBeat = 0
var gameLoop
loadMap(path) // loads the map data
function loadMap(path) {
	load(path, function(data) {
		loadGame(data)
	})
}

function loadGame(data) {
  document.getElementById('canvas').classList.remove('hide')
  clearInterval(gameLoop)
  music.stop()
  backgroundLayer.removeChildren()
  textmap = []
  textLayer.removeChildren()
  mainLayer.removeChildren()
  spikes = []
  enemies = []
	map = data
  mainLayer.add(player);
  mainLayer.add(star);
	map.beats.notes.forEach(function(note) { //load spike positions
		spikesData.push(note)
	})
	//load background
	backgroundImage.src = "backgrounds/" + map.info.background;
	//load texts
	map.texts.text.forEach(function(textData) {
		var text = new Konva.Text({ //spike drawer
			x: size + textData.x,
			y: textData.y,
			text: textData.value,
			fontSize: textData.fontSize,
			fontFamily: textData.fontFamily,
			fill: textData.fill
		});
		console.log(size + textData.x)
    textmap.push(text)
    text.transformsEnabled('position')
    player.perfectDrawEnabled(false);
		
	})
	//load music
	music.src = "maps/" + map.info.path
	music.on("load", function() {
		
	})
  	music.on("play", function() {
		  spikeManager()
	})
  music.play()

	gameLoop = setInterval(update, 1000 / 60); //60fps
}
//spikes
function createSpike() {
	var spike = new Konva.RegularPolygon({ //spike drawer
		x: 1200,
		y: 80,
		sides: 3,
		radius: 15,
		fill: 'white',
		scaleX: 0.4,
		scaleY: 0.4,
	});
	spikes.push(spike)
	mainLayer.add(spike)
	var drop = new Konva.Tween({
		node: spike,
		x: 800,
		y: 545,
		duration: 1,
		scaleX: 1,
		scaleY: 1,
		easing: Konva.Easings.EaseIn,
		onFinish: function() {
      spikes.push(spike)
      drop.destroy();
		}
	});
	drop.play()
}

function createEnemy() {
	var spike = new Konva.RegularPolygon({ //spike drawer
		x: 1200,
		y: 80,
		sides: 4,
		radius: 30,
		fill: 'red',
		scaleX: 0.4,
		scaleY: 0.4,
	});
	enemies.push(spike)
	mainLayer.add(spike)
	var drop = new Konva.Tween({
		node: spike,
		x: 800,
		y: 540,
		duration: 1,
		scaleX: 1,
		scaleY: 1,
		easing: Konva.Easings.EaseIn,
		onFinish: function() {
      enemies.push(spike)
      drop.destroy();
		}
	});
	drop.play()
}

function spikeManager() { //Creates spikes to beat
	var currentTime = music.seek()
	var nextBeatTime = parseFloat(toFixed(map.beats.notes[beatStage].time, 2))
	timeUntilNextBeat = nextBeatTime - currentTime - 5.5 //Get time until next beat -6 is how long it takes for the spike to load
	beatStage++
	setTimeout(function() {
		if (map.beats.notes[beatStage].type == "attack") {
			createEnemy()
		} else {
			createSpike()
		}
		spikeManager()
	}, timeUntilNextBeat * 1000) //seconds to miliseconds
}

function loseGame() {
	soundEffects.lose.play();
	music.stop()
	clearInterval(gameLoop)
	cancelAnimationFrame(starAnimLoop)
  setTimeout(function(){
  loadMap(path)
  },2000)
	
}

function winGame(){
  music.stop()
	soundEffects.win.play();
  bossIntroCutscene();
  setTimeout(function(){
  clearInterval(gameLoop)
	cancelAnimationFrame(starAnimLoop);
  },1000)
	
}

//utils
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