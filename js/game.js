/* Platformer */
var path = "";
var map = {
	error: true
}
var textmap = []
var spikesData = []
var spikes = []
var enemies = []
var beatStage = 0
var effectStage = 0
var timeUntilNextBeat = 0
var globalId = 0
var spikeCheck = true
var effectCheck = true

function loadMap(path) {
	load(path, function (data) {
		showCd(data.info.levelName)
		loadGame(data)
	})
}

function loadGameUI() {
	document.getElementById("levels").classList.add("hide");
	document.getElementById("canvas").classList.remove("hide");
	document.getElementById("canvas").classList.add("fade-in");
}

function loadGame(data) {
	if (gameRunning == false) {
		globalId++
		loadGameUI();
		gameRunning = true
		spikeCheck = true
		cancelAnimationFrame(window.gameLoop)
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
		map.beats.notes.forEach(function (note) { //load spike positions
			spikesData.push(note)
		})
		//load background
		backgroundImage.src = "backgrounds/" + map.info.background;
		//load texts
		map.texts.text.forEach(function (textData) {
			var text = new Konva.Text({ //spike drawer
				x: size + textData.x,
				y: textData.y,
				text: textData.value,
				fontSize: textData.fontSize,
				fontFamily: textData.fontFamily,
				fill: textData.fill
			});
			textmap.push(text)
			text.transformsEnabled('position')
			text.cache()
			player.perfectDrawEnabled(false);

		})
		//load music
		setTimeout(function(){

		
		music = new Howl({
			src: ["maps/" + map.info.path],
			onload: function(){
				console.log('loaded')
				music.play()
			},
			onplay: function(){
				spikeManager(globalId)
				effectManager(globalId)
					update()
			}
		});
		},3000)





	}
}

//spikes
function createSpike() {
/*	var spike = new Konva.RegularPolygon({ //spike drawer
		x: 1200,
		y: 80,
		sides: 3,
		radius: 15,
		fill: 'transparent',
		shadowColor: '#F8D092',
		shadowBlur: 20,
		shadowOpacity: 0.9,
		scaleX: 0.4,
		scaleY: 0.4,
		stroke: 'white',
		strokeWidth: 4
	}); */
	var spike = new Konva.Path({
        x: 1200,
        y: 80,
        data:
		'M222.941,60.444c-58.541-40.891-66.079-54.548-66.879-56.37L156.15,0l-4.215,0.5    c-12.646,1.474-17.09,10.16-17.72,15.153v221.19c-9.595-2.377-20.418-2.274-30.807,0.305    c-13.679,3.394-25.542,10.72-33.412,20.641c-8.088,10.193-11.041,21.811-8.344,32.629c2.681,17.013,22.659,29.85,46.455,29.85    c5.292,0,10.546-0.642,15.637-1.931c22.964-5.716,40.298-22.708,42.43-41.516h0.277l0.587-214.609    c11.77,1.169,48.892,9.627,85.747,67.406l6.766,10.617l0.038-12.591C259.601,126.056,259.356,88.472,222.941,60.444z',
        fill: map.info.noteColor,
        scale: {
          x: 0.1,
          y: 0.1
		},
		shadowColor: '#F8D092',
		shadowBlur: 20,
		shadowOpacity: 0.9
      });
	spikes.push(spike)
	mainLayer.add(spike)
	spike.cache()
	var drop = new Konva.Tween({
		node: spike,
		x: 800,
		y: 520,
		duration: 1,
		scaleX: 0.1,
		scaleY: 0.1,
		easing: Konva.Easings.EaseIn,
		onFinish: function () {
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
		radius: 27,
		fill: 'red',
		scaleX: 0.4,
		scaleY: 0.4,
		shadowColor: 'red',
		shadowBlur: 20,
		shadowOpacity: 0.9
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
		onFinish: function () {
			enemies.push(spike)
			drop.destroy();
		}
	});
	drop.play()
}

function spikeManager(current) { //Creates spikes to beat

	if (gameWonAlready) return;
	if (current !== globalId) {
		return;

	} else {

		var currentTime = music.seek()
		var nextBeatTime = parseFloat(toFixed(map.beats.notes[beatStage].time, 2))
		timeUntilNextBeat = nextBeatTime - currentTime - 5.5 //Get time until next beat -6 is how long it takes for the spike to load
		beatStage++
		console.log(timeUntilNextBeat)
	
		if (current !== globalId) {
			return;

		}
		if(Math.sign(timeUntilNextBeat) == -1){
			spikeManager(current)
			return;
		}
		if(beatStage == 1 && spikeCheck && timeUntilNextBeat >= 1){//fix insta spawn bug
			beatStage-- // go back down so first beat is correctly placed
			spikeCheck = false // turn off this check
			nextBeatTime = parseFloat(toFixed(map.beats.notes[beatStage].time, 2))
			timeUntilNextBeat = nextBeatTime - currentTime - 5.5 //Get correct first beat position
			setTimeout(function () { //redo
				spikeManager(current)
			}, timeUntilNextBeat * 1000) //seconds to miliseconds
			return;
		}
		try {
	
			if (map.beats.notes[beatStage].type == "attack") {
				soundEffects.spikeCreate.play()
				createEnemy()
			} else {
				soundEffects.spikeCreate.play()
				createSpike()
			}

			console.log("omg success");
		} catch (error) {
			console.log(error);
		}
		setTimeout(function () {
			spikeManager(current)
		}, timeUntilNextBeat * 1000) //seconds to miliseconds
	}
}
//effects
function effectManager(current){
	console.log("asd")
	var nextEffect = map.effects[effectStage]
	var currentTime = music.seek()
	var nextEffectTime = parseFloat(toFixed(map.effects[effectStage].time, 2))
	var timeUntilNextEffects = nextEffectTime - currentTime

	
	if (gameWonAlready) return;
	if (current !== globalId) {
		
		return;

	}
	if(effectStage == 0 && effectCheck && timeUntilNextBeat >= 1){//fix insta spawn bug
		
		effectCheck = false // turn off this check
		nextBeatTime = parseFloat(toFixed(map.beats.notes[beatStage].time, 2))
		timeUntilNextBeat = nextBeatTime - currentTime //Get correct first beat position
		console.log(timeUntilNextBeat)
		setTimeout(function () { //redo
			effectManager(current)
		}, timeUntilNextBeat * 1000) //seconds to miliseconds
		return;
	}

	//trigger effect
	effects[nextEffect.effectType][nextEffect.effect](nextEffect.seconds)
	
	
	setTimeout(function(){
		effectManager(current)
	},timeUntilNextEffects)
		
		

	
}

function loseGame() {
	gameRunning = false;
	soundEffects.lose.play();
	cancelAnimationFrame(window.gameLoop)
	music.stop()
	cancelAnimationFrame(starAnimLoop)
	beatStage = 0
	setTimeout(function () {
		loadMap(path)
	}, 1000);

}

function winGame() {
	gameRunning = false
	music.stop()
	soundEffects.win.play();
	bossIntroCutscene(path);
	setTimeout(function () {
		cancelAnimationFrame(window.gameLoop)
		cancelAnimationFrame(starAnimLoop);
	}, 1000)

}

//utils
function load(path, success, error) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
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

/* Boss Battle */
// Boss info:
var boss = document.getElementById("bossDiv");

// Music Variable:
var song = null;
var timeNextBeat = null;

// Vars for health and points scored:
var userScore = 0;
var userHP = 100;
var bossHP = 100;

// Random go-to key var:
var rnd = Math.floor(Math.random() * (4 - 1 + 1) + 1);
var lastRnd = rnd;

// Ready To Press Key:
var pressReady = false;

// Var to check if you are playing currently: 
var inGame = true;

// setInterval Var:
var updateInterval = null;

// Update Score Func:
function updateScore(scoreChange, userHPChange, bossHPChange) {
	userScore = userScore + scoreChange;
	userHP = userHP + userHPChange;
	bossHP = bossHP + bossHPChange;
	document.getElementById("score").innerText = userScore;
	document.getElementById("health").innerHTML = userHP;
	document.getElementById("boss-health").innerHTML = bossHP;
}

// Move boss to signal next beat:
function bossGoToKey() {
	while (rnd == lastRnd) {
		rnd = Math.floor(Math.random() * (4 - 1 + 1) + 1);
	}
	lastRnd = rnd;
	switch (rnd) {
		case 1:
			boss.style.transform = "translateX(-250px) translateY(300px)";
			break;
		case 2:
			boss.style.transform = "translateX(-85px) translateY(300px)";
			break;
		case 3:
			boss.style.transform = "translateX(80px) translateY(300px)";
			break;
		case 4:
			boss.style.transform = "translateX(240px) translateY(300px)";
			break;
	}
}

// Map Object:
var beatMap = {};

// Load MIDI & Build Map Data:
function loadMIDI(path) {
	load(path, function (data) {
		buildGame(data);
	});
}

function buildGame(data) {
	var tmpMap = {
		arrayCounter: 0,
		beatArray: []
	};
	tmpMap.info = data.info;
	data.beats.notes.forEach(function (note) {
		tmpMap.beatArray.push(note);
	});
	beatMap = tmpMap;
	song = new Howl({
		src: ["maps/" + tmpMap.info.path]
	});
	song.play();
	console.log("loadedgametotally");
	document.getElementById("boss-battle-ui").style.background = "url('../backgrounds/" + beatMap.info.background + "')";
	document.getElementById("boss-battle-ui").style.backgroundPosition = "center";
	document.getElementById("boss-battle-ui").style.backgroundSize = "cover";
	updateInterval = setInterval(updateGame, 1000 / 60);
}

// Update Function:
function updateGame() {
	if (bossHP <= 0) {
		console.log("Boss Killed OMG")
		return levelCompleted("You killed the boss!", [true, 4, true]);
	} else if (userHP <= 0) {
		return levelCompleted("You were killed by the boss!", [false, 0, false]);
	}
	var timeCurrentSong = song.seek();
	if (song.seek == 0) {
		song.stop();
		song.play();
	}
	timeNextBeat = parseFloat(toFixed(beatMap.beatArray[beatMap.arrayCounter].time, 2));
	if (timeNextBeat - timeCurrentSong <= 2) {
		console.log("That was beat #" + beatMap.arrayCounter);
		bossGoToKey();
		pressReady = true;
		beatMap.arrayCounter += 1;
		if (beatMap.arrayCounter >= beatMap.beatArray.length - 1) {
			console.log("OMG We Finished The Map!");
			return levelCompleted("You Survived The Boss!", calcStarScore(userScore, true));
		}
	}
}

// Object for each beat visualizer:
var beats = {
	"KeyA": {
		element: document.getElementById("viz1"),
		number: 1
	},
	"KeyS": {
		element: document.getElementById("viz2"),
		number: 2
	},
	"KeyD": {
		element: document.getElementById("viz3"),
		number: 3
	},
	"KeyF": {
		element: document.getElementById("viz4"),
		number: 4
	}
};

// Some RegEx thingy LeHuy gave me:
function toFixed(num, fixed) {
	var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
	return num.toString().match(re)[0];
}

// Optimised LeHuy's input function:
function checkPress(key) {
	if (beats.hasOwnProperty(key.code) == false || inGame == false || pressReady == false) {
		return;
	}
	activateBeat(beats[key.code].element);
	pressReady = false;
	if (rnd == beats[key.code].number) {
		if (timeNextBeat - song.seek() <= 1.5) {
			addRating("Perfect");
			updateScore(10, 1, -5);
		} else if (timeNextBeat - song.seek() <= 3.5) {
			addRating("Good");
			updateScore(5, 0, -5);
		} else if (timeNextBeat = song.seek() > 3.5) {
			addRating("Early");
			updateScore(1, -1, -1);
		} else {
			addRating("Wrong");
			updateScore(-7, -5, 0);
		}
	} else {
		addRating("Wrong");
		updateScore(-7, -5, 0);
	}
}


// Change UI of beat <div>s:
function activateBeat(beat) {
	beat.style.height = "350px";
	setTimeout(function () {
		beat.style.height = "10px";
	}, 300);
}

// Change the rating to be [GOOD, PERFECT, EARLY, WRONG]:
function addRating(rating) {
	document.getElementById("ratings").innerText = rating;
}

// Complete Level + Star Scoring:
function levelCompleted(message, starsWin) {
	clearInterval(updateInterval);
	setTimeout(function () {
		updateInterval = null;
		alert(message);
		if (starsWin[0]) alert("Good Job!");
		else if (message == "You Survived The Boss!" && starsWin[1] == 0) alert("But you didn't score enough to get any stars.");
		else alert("Noooooo. You lost.");
		alert("You got " + starsWin[1] + " stars.");
		dataArray.stars = dataArray.stars + starsWin[1];
		var nameTmp = beatMap.info.levelName;
		dataArray.levels[nameTmp].completed = true;
		dataArray.levels[nameTmp].starsEarned = starsWin[1];
		buildLevels();
		goBackToLevelScreen();
	}, 2000);
}

function calcStarScore(score) {
	var starArray = beatMap.info.starScores;
	if (score >= starArray[0]) return [true, 1, true];
	if (score >= starArray[1]) return [true, 2];
	if (score >= starArray[2]) return [true, 3];
	return [false, 0];
}
function goBackToLevelScreen(){

}