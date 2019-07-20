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
		effects.flips.remove()
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
		effectStage = 0
		effectCheck = true
		enemies = []
		map = data
		mainLayer.add(player);
		mainLayer.add(star);
		map.beats.notes.forEach(function (note) { //load spike positions
			spikesData.push(note)
		})
		//load background
		if(map.hasOwnProperty("online")) backgroundImage.src = map.info.background;
		else backgroundImage.src = "backgrounds/" + map.info.background;
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
		var srcTmp = "maps/" + map.info.path;
		if(map.hasOwnProperty("online")) srcTmp = map.info.path;
		music = new Howl({
			src: [srcTmp],
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
		starAnimLoop = window.requestAnimationFrame(animateStar);
		





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
	var spike = new Konva.Path({ //spike drawer
		x: 1200,
		y: 80,
		data: 
		'M 592.10873,1275.9669 C 461.75172,1268.3902 328.65904,1186.6265 249.0601,1092.783 C 156.77394,983.97782 118.72592,836.04683 128.47199,714.56357 C 157.10277,357.61288 545.27831,146.63848 688.97108,-9.280262 C 785.15294,-113.64625 805.31643,-164.52308 826.79977,-218.19949 C 868.39181,-322.09965 875.09166,-443.8341 792.63375,-452.92251 C 713.90712,-461.59988 649.13737,-337.79201 620.20973,-253.17845 C 594.19587,-177.07331 576.90507,-100.71696 592.5563,13.979673 C 599.58954,65.50958 793.18636,1503.9125 796.45179,1526.2088 C 829.05589,1749.0255 701.63092,1841.2249 571.55248,1857.6251 C 290.65671,1893.038 200.52617,1607.5843 326.4212,1499.1719 C 423.34291,1415.7001 564.35026,1487.3615 556.73245,1624.5919 C 549.98693,1746.1391 430.80546,1749.7197 400.35244,1746.9429 C 447.10065,1830.7846 799.52998,1874.5871 745.41513,1495.7923 C 737.811,1442.5634 558.91549,90.842953 554.53112,60.595454 C 521.71238,-165.84753 516.71147,-345.08557 634.69182,-554.25141 C 678.24767,-631.46637 747.0821,-681.3156 780.87362,-674.7893 C 788.29962,-673.35526 795.69824,-670.62872 801.57144,-664.56827 C 892.07191,-571.31845 919.83494,-364.53202 909.9199,-245.74332 C 899.76736,-124.11391 894.1088,1.7993735 773.16902,148.63428 C 726.36601,205.45738 583.54553,330.63538 501.65851,402.55255 C 386.60107,503.59831 303.14756,591.85179 257.99323,698.31862 C 207.24886,817.97506 198.65826,968.6006 313.27268,1102.2505 C 379.20247,1177.7619 488.59222,1231.3424 580.65459,1232.4842 C 836.63719,1235.6628 911.39048,1109.4801 913.77904,966.58197 C 917.71126,731.28351 633.64596,642.32214 516.85762,804.10953 C 449.14212,897.92109 478.90552,996.66049 524.38411,1043.6371 C 539.99424,1059.7587 557.43121,1072.0395 573.92734,1078.8855 C 579.9056,1081.3654 593.96751,1087.9054 589.97593,1097.4779 C 586.6557,1105.4428 580.20702,1105.8904 574.33381,1105.1871 C 500.68573,1096.3544 419.13667,1025.958 399.0828,904.87212 C 369.86288,728.38801 525.6035,519.0349 747.9133,553.274 C 893.45572,575.68903 1028.5853,700.92182 1016.7338,934.11946 C 1006.5722,1133.9822 840.87996,1290.4262 592.10873,1275.9669 z',
		 scale: {
          x: 0.05,
          y: 0.05
		},
		sides: 4,
		fill: 'red',
		shadowColor: 'red',
		shadowBlur: 20,
		shadowOpacity: 0.9
	});
	enemies.push(spike)
	mainLayer.add(spike)
	var drop = new Konva.Tween({
		node: spike,
		x: 800,
		y: 500,
		duration: 1,
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
			console.log("check ran")
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

	var nextEffect = map.effects[effectStage]
	var currentTime = music.seek()
	
	
	if (gameWonAlready) return;
	if (current !== globalId) {
		
		return;
	}
	if(effectStage == 0 && effectCheck){//fix insta spawn bug
		
		effectCheck = false // turn off this check
		currentTime = music.seek()
		var nextEffectTime = parseFloat(toFixed(map.effects[effectStage].time, 2))
		timeUntilNextEffects = nextEffectTime - currentTime 
		console.log(timeUntilNextEffects + "in check")
		setTimeout(function () { //redo
			effectManager(current)
		}, timeUntilNextEffects * 1000) //seconds to miliseconds
		return;
	}

	//trigger effect
	effects[nextEffect.effectType][nextEffect.effect](nextEffect.seconds)
	
	//next effect
	effectStage++
	try{
	var nextEffectTime = parseFloat(toFixed(map.effects[effectStage].time, 2))
	}
	catch{
		return;
	}
	timeUntilNextEffects = nextEffectTime - currentTime 
	console.log(timeUntilNextEffects + "||" + effectStage)
	setTimeout(function(){
		effectManager(current)
	},timeUntilNextEffects * 1000)
		
		

	
}

function loseGame() {
	gameRunning = false;
	cancelAnimationFrame(window.gameLoop)
	cancelAnimationFrame(starAnimLoop)
	beatStage = 0
	requestAnimationFrame(killMusic)
	setTimeout(function () {
		music.stop()
		loadMap(path)
	}, 2000);

}
function killMusic(){
	if(music.rate() <= 0){
		return;
	}
	music.rate(music.rate() - 0.01)
	requestAnimationFrame(killMusic)
}
function winGame() {
	gameRunning = false
	effects.flips.remove()
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
		beatArray: [],
		online: false
	};
	tmpMap.info = data.info;
	data.beats.notes.forEach(function (note) {
		tmpMap.beatArray.push(note);
	});
	if(data.hasOwnProperty("online")){
		tmpMap.online = true;
	}
	beatMap = tmpMap;
	var srcTmp = "maps/" + tmpMap.info.path;
	if(data.hasOwnProperty("online")) srcTmp = tmpMap.info.path;
	song = new Howl({
		src: [srcTmp]
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
		if(starsWin[0] == false) loseBattleNoise();
		updateInterval = null;
		alert("You got " + starsWin[1] + " stars.");
		dataArray.stars = dataArray.stars + starsWin[1];
		if(beatMap.online == false){
			var nameTmp = beatMap.info.levelName.toLowerCase();
			dataArray.levels[nameTmp].completed = true;
			dataArray.levels[nameTmp].starsEarned = starsWin[1];
			buildLevels();
		}
		goBackToLevelScreen(message, starsWin);
	}, 2000);
}

function calcStarScore(score){
	var starArray = beatMap.info.starScores;
	if (score >= starArray[0]) return [true, 1];
	if (score >= starArray[1]) return [true, 2];
	if (score >= starArray[2]) return [true, 3];
	return [false, 0];
}
function goBackToLevelScreen(msg, starsWin){
	document.getElementById("levels").classList.remove("hide");
	document.getElementById("boss-battle-ui").classList.add("hide");
	setTimeout(()=>{ song.stop(); }, 5000);
	showEndgamePopup(userScore, userHP, bossHP, msg, starsWin);
}

function showEndgamePopup(playerScore, playerHealth, bossHealth, message, starsWin){
	document.getElementById("win-message").innerText = message;
	document.getElementById("win-stars-earned").innerText = dataArray.firstName + ", You Earned " + starsWin[1] + " Stars";
	document.getElementById("win-lose-popup").classList.remove("hide");
	document.getElementById("final-score").innerText = "Your Final Score Is " + playerScore + ".";
}

// Kill Song Sound For Loss:
function loseBattleNoise(){
	if(song.rate() <= 0){
		return;
	}
	song.rate(song.rate() - 0.01);
}