//create the game canvas and player
var size = window.innerWidth;
var height = window.innerHeight;
var lastFrameRenderTime = null; //store when the last frame was drawn
var music = new Howl({
	src: ['maps/onestop.mp3']
});
var initMusic = 0 // prevent starting game on website load
var gravity = 0.5;
var keys = []
var jumpAnim
var starAnim = 50
var starAnimLoop
var textsAnimLoop
var rockSpeedY = 5
var starAnimType = 'down'
var swordOn = false
var gameWonAlready = false;
var gameRunning = false;
var stage = new Konva.Stage({
	container: 'canvas', // id of container <div>
	width: size,
	height: height
});
window.onkeydown = function (event) {
	keys[event.key] = true;
};
window.onkeyup = function (event) {
	keys[event.key] = false;
};
//Background layer
var background
var backgroundLoad = false
var background2
var background3
var backgroundLayer = new Konva.FastLayer();
var backgroundImage = new Image();
var backgoundSpeed = 0.5;
var backgroundLoad = false
var backgroundImpactAnim
backgroundImage.onload = function () {
	background = new Konva.Image({
		x: 0,
		y: 0,
		image: backgroundImage,
		width: size,
		height: 550,
	});
	background3 = new Konva.Image({
		x: size,
		y: 0,
		image: backgroundImage,
		width: size,
		height: 550,
	});
	backgroundLayer.add(background)
	backgroundLayer.add(background3)
	background2 = new Konva.Rect({
		x: -10,
		y: 555,
		stroke: 'white',
		strokeWidth: 5,
		fill: 'black',
		width: size + 20,
		height: 550,
	});	
	backgroundLayer.add(background2)
	backgroundLoad = true
	background.cache()
	background2.cache()
	background3.cache()
	background.transformsEnabled('position');
	background2.transformsEnabled('position');
	background.listening(false)
	background2.listening(false)
	backgroundLoad = true
	backgroundImpactAnim = new Konva.Tween({
		node: background2,
		duration: 0.5,
		stroke: 'red',
		fill: 'white',
		strokeWidth: 5,
	
	})
}
//Text layer
var textLayer = new Konva.FastLayer();
//Main layer Players,Stars,Spikes
var mainLayer = new Konva.FastLayer();
//Player Data
var player = new Konva.Rect({
	width: 50,
	height: 50,
	radius: 20,
	fill: '#2E3D7C',
	y: 500,
	x: 40,
});
var sword = new Konva.RegularPolygon({
	x: 100,
	y: 530,
	sides: 3,
	radius: 20,
	fill: '#580103',
	rotation: 90,
	shadowColor: '#F8D092',
	shadowBlur: 20,
	shadowOpacity: 0.9,
});
var playerPosition = {
	x: 40,
	y: 500,
	speedY: 5,
	jump: false
}
player.perfectDrawEnabled(false);
player.transformsEnabled('position')
player.cache()
sword.perfectDrawEnabled(false)
mainLayer.add(player);
//starData Data + Animations
var star
var starImage = new Image();
starImage.onload = function(){
	 star = new Konva.Image({
		width: 50,
		height: 50,
		image: starImage,
		shadowColor: '#F8D092',
		shadowBlur: 20,
		shadowOpacity: 0.9,
		numPoints: 5,
		innerRadius: 20,
		outerRadius: 20,
		y: 50,
		x: 1200
	});
	star.offsetX(star.width() / 2);
	star.offsetY(star.height() / 2);
	mainLayer.add(star);
	star.cache()
	star.listening(false)
	starAnimLoop = window.requestAnimationFrame(animateStar);
	}
	
starImage.src = "img/cd.png"

//add layer to stage
stage.add(backgroundLayer)
stage.add(textLayer)
stage.add(mainLayer);
//Player input handler
function playerInputHandler() {
	if (keys["x"] == true && playerPosition.jump == false) {
		mainLayer.add(sword)
	
		swordOn = true
	} else if (keys[" "] == true) {
		sword.remove()

		if (playerPosition.jump == false) {
			playerPosition.jump = true
			playerPosition.speedY = 8
			player.setY(499)
			jumpAnim = window.requestAnimationFrame(jump)
		}
	} else {
		if(swordOn){
			sword.remove()
			swordOn = false
	
	}
		

	}
}
//Main draw function
function update(time) {
	
	
	if (gameRunning) {
	var timeInBetweenFrames = time - lastFrameRenderTime
	if(timeInBetweenFrames >= 100){ // adapt music if the game lags for over 0.1 seconds

		music.seek(music.seek() + timeInBetweenFrames / 1000 )
	}
		lastFrameRenderTime = time
		backgroundLayer.draw()
		textLayer.draw()
		mainLayer.draw()
		playerInputHandler()
		moveSpikes()
		moveEnemy()
		moveTexts()
		moveBackground()
		
		window.gameLoop = requestAnimationFrame(update)

	} else {
		return;
	}
}

function jump() {
	if (player.getY() >= 500) {
		cancelAnimationFrame(jumpAnim);
		playerPosition.jump = false
		return;
	}
	player.setY(player.getY() - playerPosition.speedY);
	playerPosition.speedY -= gravity;
	window.requestAnimationFrame(jump);
}
//move background
function moveBackground() {
	if (backgroundLoad) {
		background.setX(background.getX() - backgoundSpeed)
		background3.setX(background3.getX() - backgoundSpeed)
		if (background.getX() < -size) {
			background.setX(size)
		}
		if (background3.getX() < -size) {
			background3.setX(size)
		}
	}
}

function moveSpikes() {
	spikes.forEach(function (spike, i) {
		if (map.beats.notes[beatStage] == undefined && spikes[spikes.length - 1].getX() <= 0) {
			if (gameWonAlready == false) winGame();
			gameWonAlready = true;
			return;
		} else if (spikes[i].getX() <= 0) {
			spikes[i].destroy()
			spikes.splice(i, 1)
			//refine spike parms
		} else if (checkCollisions(player.width(), player.height(), player.getX(), player.getY(), spikes[i].width() - 20, spikes[i].height() - 10, spikes[i].getX() + 13, spikes[i].getY()) && gameRunning) {
			gameRunning = false
			loseGame()
			console.log()
		}
		spike.setX(spike.getX() - 2) //2 = speed
	})
}

function moveEnemy() {
	enemies.forEach(function (spike, i) {
		if (map.beats.notes[beatStage] == undefined && enemies[enemies.length - 1].getX() <= 0) {
			if (gameWonAlready == false) winGame();
			gameWonAlready = true;
			return;
		} else if (enemies[i].getX() <= 0) {
			enemies[i].destroy()
			enemies.splice(i, 1)
		} else if (checkCollisions(player.width(), player.height(), player.getX() + 20, player.getY(), 30, 25, enemies[i].getX() + 30, enemies[i].getY()) && gameRunning) {
			if (swordOn) {
				var breakRock = new Konva.Tween({
					node: enemies[i],
					y: 1000,
					duration: 0.1,
					easing: Konva.Easings.EaseIn,
					onFinish: function () {
						breakRock.destroy();
					}
				});
				breakRock.play()
			} else {
				gameRunning = false
				loseGame()
			}
		} else if (map.beats.notes[beatStage] == undefined && enemies[i].getX() <= 0) {
			if (gameWonAlready == false) winGame();
			gameWonAlready = true;
			return;
		}
		spike.setX(spike.getX() - 2) //2 = speed
	})
}

function animateStar() {
	if (starAnimType == "down") {
		starAnim += 0.1
		star.rotation(star.rotation() + 1)
		star.setY(starAnim)
	}
	if (starAnimType == "up") {
		starAnim -= 0.1
		star.rotation(star.rotation() + 1)
		star.setY(starAnim)
	}
	if (starAnim <= 50) {
		starAnimType = "down"
	} else if (starAnim >= 60) {
		starAnimType = "up"
	}
	starAnimLoop = window.requestAnimationFrame(animateStar);
}


function moveTexts() {
	textmap.forEach(function (text, i) {
		if (text.getX() > size) {
			textLayer.add(text)
		}
		if (textmap[i].getX() + textmap[i].width() <= 0) {
			textmap[i].destroy()
			textmap.splice(i, 1)
		}
		text.setX(text.getX() - 1)
	})
}
//utils
function checkCollisions(rect1Width, rect1Height, rect1XPos, rect1YPos, rect2Width, rect2Height, rect2XPos, rect2YPos) {
	if (rect1XPos < rect2XPos + rect2Width && rect1XPos + rect1Width > rect2XPos && rect1YPos < rect2YPos + rect2Height && rect1Height + rect1YPos > rect2YPos) {
		return true;
	} else {
		return false
	}
}

function reloadLevelsPage(){
	localStorage.setItem(
        dataArray.firstName.toUpperCase() + "Store",
        JSON.stringify(dataArray)
    );
	document.getElementById("star-amount").innerText = dataArray.stars.toString();
	window.location.search = "?f=" + dataArray.firstName;
	setTimeout(function(){
		window.location.reload();
	}, 500);
}