var titleDiv = document.getElementById('titleDiv')
var levelDiv = document.getElementById('levelDiv')
var plyBtn = document.getElementById('plyBtn')
var gameTxt = document.getElementById('gameTxt')
var mainDiv = document.getElementById('mainDiv')
plyBtn.addEventListener('click', playGame)
var map // keep this
var beatStage = 1 // keep this it is the number the beat is on
var music = new Audio(); // keep
var inGame = false // if in game it is true
var timeUntilNextBeat
var songNameTxt = document.getElementById('songNameTxt') // change this it displays the SONG name "Alan Walker - GG song"
var lastBeat // keep this stores the last beat u played
var bar = document.getElementById('bar') // bar that shows how close you are to being done
var scoreTxt = document.getElementById('scoreTxt') // chane this it displays 
var score = 0
var resultScoreTxt = document.getElementById('resultScoreTxt')
var result = document.getElementById('result')
var tutorialDiv = document.getElementById('tutorialDiv')
var autoPlay = document.getElementById('ap')
var importLvl = document.getElementById('importLvl')
importLvl.addEventListener('click', importLevel)
var background = document.getElementById('background')
var backgroundSources =["Cutt","Fiber","Moonvirus","Neon","Xann","Narrow-Gultch","Pink-vynil","Eightytown"]
background.src = "backgrounds/" + backgroundSources[Math.floor(Math.random()*backgroundSources.length)] + ".mp4"
var animationDuration = 200; 
var startValue = 1;
var endValue = 3;
var backgroundEffect = false;
var loader = document.getElementById('loader')
var settingsDiv = document.getElementById('settingsDiv')
//Beat elements

var beat1 = {
	element: document.getElementById("beat1"),
	color: "#F83D3D",
	canvas: document.getElementById("beat1canvas")
}
var beat2 = {
	element: document.getElementById("beat2"),
	color: "#2BD1FC",
	canvas: document.getElementById("beat2canvas")
}
var beat3 = {
	element: document.getElementById("beat3"),
	color: "#F3EA5F",
	canvas: document.getElementById("beat3canvas")
}
var beat4 = {
	element: document.getElementById("beat4"),
	color: "#95F51F",
	canvas: document.getElementById("beat4canvas")
}
var tutBeat = {
	element: document.getElementById("tutBeat"),
	color: "#95F51F"
}

function input(key) { //Handle Input
	if (key.code == "KeyA" && inGame && lastBeat !== beatStage) {
		active(beat1)
		if (map[beatStage].beat == 1) {
			if (map[beatStage].time - music.currentTime <= 0.1) {
				addRating(beat1.element, "Perfect")
				lastBeat = beatStage
				updateScore(10)
			} else if (map[beatStage].time - music.currentTime <= 1) {
				addRating(beat1.element, "Good")
				updateScore(5)
				lastBeat = beatStage
			} else if (map[beatStage].time = music.currentTime >= 1.4) {
				addRating(beat1.element, "Early")
				updateScore(0)
				lastBeat = beatStage
			}
		} else {
			addRating(beat1.element, "Wrong")
			updateScore(-10)
		}
	}
	if (key.code == "KeyS" && inGame && lastBeat !== beatStage) {
		active(beat2)
		if (map[beatStage].beat == 2) {
			if (map[beatStage].time - music.currentTime <= 0.1) {
				addRating(beat2.element, "Perfect")
				updateScore(10)
			} else if (map[beatStage].time - music.currentTime <= 0.5) {
				addRating(beat2.element, "Good")
				updateScore(5)
			} else if (map[beatStage].time = music.currentTime >= 1) {
				addRating(beat2.element, "Early")
				lastBeat = beatStage;
				updateScore(0)
			}
		} else {
			addRating(beat2.element, "Wrong")
			updateScore(-10)
		}
	}
	if (key.code == "KeyD" && lastBeat !== beatStage && inGame) {
		active(beat3)
		if (map[beatStage].beat == 3) {
			if (map[beatStage].time - music.currentTime <= 0.1) {
				addRating(beat3.element, "Perfect")
				lastBeat = beatStage
				updateScore(10)
			} else if (map[beatStage].time - music.currentTime <= 1) {
				addRating(beat3.element, "Good")
				lastBeat = beatStage
				updateScore(5)
			} else if (map[beatStage].time = music.currentTime >= 1.4) {
				addRating(beat3.element, "Early")
				lastBeat = beatStage
				updateScore(0)
			}
		} else {
			addRating(beat3.element, "Wrong")
			updateScore(-10)
		}
	}
	if (key.code == "KeyF" && inGame && lastBeat !== beatStage) {
		active(beat4)
		if (map[beatStage].beat == 4 && lastBeat !== beatStage) {
			if (map[beatStage].time - music.currentTime <= 0.1) {
				addRating(beat4.element, "Perfect")
				lastBeat = beatStage
				updateScore(10)
			} else if (map[beatStage].time - music.currentTime <= 1) {
				addRating(beat4.element, "Good")
				lastBeat = beatStage
				updateScore(5)
			} else if (map[beatStage].time = music.currentTime >= 1.4) {
				addRating(beat4.element, "Early")
				lastBeat = beatStage
				updateScore(0)
			}
		} else {
			addRating(beat4.element, "Wrong")
			updateScore(-10)
		}
	}
}

function active(beat) { //glow
	beat.element.style.filter = "brightness(1.4)";
	beat.element.style.boxShadow = "0px 0px 100px 15px" + beat.color
	if (beat !== tutBeat) {
		backgroundManager()
	}
	setTimeout(function() {
		unactive(beat)
	}, 200)
}

function unactive(beat) { //unglow
	beat.element.style.filter = "brightness(0.3)";
	beat.element.style.boxShadow = "0px 0px 0px 0px" + beat.color
}

function addRating(ele, ratingtype) { //Add rating under button
	var rating = document.createElement("h2")
	rating.innerText = ratingtype
	rating.classList.add('rating')
	rating.classList.add(ratingtype)
	ele.appendChild(rating)
	setTimeout(function() {
		rating.parentElement.removeChild(rating)
	}, 1000)
}

function tutorial() {
	tutorialDiv.classList.remove('hide')
	levelDiv.classList.add('hide')
	setInterval(function() {
		active(tutBeat)
	}, 1000)
}

function closeTutorial() {
	tutorialDiv.classList.add('hide')
	tutorialDiv.classList.add('hide')
	loadMap('/levels/tutorial.json');
}

function loadMap(path) {
	load(path, function(data) {
		loadGame(data)
	})
}

function loadGame(data) {
	beatStage = 1
	map = data
	levelDiv.classList.add('hide')
	loader.classList.remove('hide')
	background.src = ""
	background.playbackRate = 1
	if (map[0].background !== undefined) {
		background.src = "backgrounds/" + map[0].background + ".mp4"
	} //load background
	//load music and title data and bar
	gameTxt.innerText = map[0].name
	music.src = map[0].songPath
	songNameTxt.innerHTML = map[0].songName
	bar.style.animation = "bar " + map[map[0].lastBeat].time + "s linear forwards"
	//reset score
	score = 0
	scoreTxt.innerText = "Score: 0"
	//Unhide main div and hide level div
	setTimeout(function() {
		if (autoPlay.checked == false) {
			inGame = true
		}
		mainDiv.classList.remove('hide')
		loader.classList.add('hide')
		music.play();
		runGame();
	}, 1200)
}

function importLevel() {
	importDiv.classList.remove('hide')
}

function runGame() {
	timeUntilNextBeat = map[beatStage].time - music.currentTime //Get time until next beat
	var previewElement = document.createElement("div") // Make preview for beat
	previewElement.classList.add("preview")
	previewElement.style.animation = "preview " + timeUntilNextBeat + "s linear forwards"
	//Add preview on the correct beat
	if (map[beatStage].beat == 1) {
		beat1.element.appendChild(previewElement)
	}
	if (map[beatStage].beat == 2) {
		beat2.element.appendChild(previewElement)
	}
	if (map[beatStage].beat == 3) {
		beat3.element.appendChild(previewElement)
	}
	if (map[beatStage].beat == 4) {
		beat4.element.appendChild(previewElement)
	}
	setTimeout(function() { // remove preview and run next beat after this beat is over
		if (beatStage == map[0].lastBeat) {
			setTimeout(openResult, timeUntilNextBeat * 1000)
			previewElement.parentElement.removeChild(previewElement)
		} else {
			previewElement.parentElement.removeChild(previewElement)
			if (map[beatStage].camerashake) {
				mainDiv.style.animation = "cs 0.5s"
				setTimeout(function() {
					mainDiv.style.animation = "none"
				}, 450)
			}
			if (map[beatStage].beat == 1 && autoPlay.checked) {
				active(beat1)
				addRating(beat1.element, "Perfect")
			}
			if (map[beatStage].beat == 2 && autoPlay.checked) {
				active(beat2)
				addRating(beat2.element, "Perfect")
			}
			if (map[beatStage].beat == 3 && autoPlay.checked) {
				active(beat3)
				addRating(beat3.element, "Perfect")
			}
			if (map[beatStage].beat == 4 && autoPlay.checked) {
				active(beat4)
				addRating(beat4.element, "Perfect")
			}
			beatStage += 1
			runGame();
		}
	}, timeUntilNextBeat * 1000)
}

function openResult() {
	result.classList.remove('hide')
	importDiv.classList.add('hide')
	resultScoreTxt.innerText = scoreTxt.innerText
	inGame = false;
}

function exitResult() {
	result.classList.add('fade-out')
	mainDiv.classList.add('fade-out')
	setTimeout(function() {
		levelDiv.classList.remove('hide')
		result.classList.add('hide')
		mainDiv.classList.add('hide')
		result.classList.remove('fade-out')
		mainDiv.classList.remove('fade-out')
		music.pause()
		background.src = "backgrounds/" + backgroundSources[Math.floor(Math.random() * backgroundSources.length)] + ".mp4"
	}, 1000)
}

function updateScore(valToAdd) {
	score += valToAdd
	scoreTxt.innerText = "Score: " + score;
}

function videoSpeed() {}

function load(path, success, error) //util ---------------------
{
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
music.onended = function() {
	return
};

function backgroundManager() {
	if (backgroundEffect !== true) {
		animationDuration = 200;
		startValue = 1;
		endValue = 3;
		window.requestAnimationFrame(animateNextFrame);
		setTimeout(function() {
			animationDuration = 200;
			startValue = 3;
			endValue = 1;
			window.requestAnimationFrame(animateNextFrame);
			backgroundEffect = false;
		}, 205)
	}
}

function animateNextFrame(currentTime) {
	if (!startValue) startValue = currentTime;
	var elapsedTime = currentTime - startValue;
	if (elapsedTime < animationDuration) {
		currentValue = Math.floor((elapsedTime / animationDuration) * (endValue - startValue));
		background.playbackRate = currentValue
		window.requestAnimationFrame(animateNextFrame);
	} else {
		background.playbackRate = endValue
	}
}
    