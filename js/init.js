//create the game canvas and player
var size = window.innerWidth;
var height = window.innerHeight;
var music = new Howl({
	src: ['maps/onestop.mp3']
});
var gravity = 0.5;
var keys = []
var jumpAnim
var starAnim = 50
var starAnimLoop
var textsAnimLoop
var starAnimType = 'down'
var swordOn = false
var stage = new Konva.Stage({
	container: 'canvas', // id of container <div>
	width: size,
	height: height
});
window.onkeydown = function(event) {
	keys[event.key] = true;
};
window.onkeyup = function(event) {
	keys[event.key] = false;
};
//Background layer
var background
var backgroundLoad = false
var background2
var backgroundLayer = new Konva.Layer();
var backgroundImage = new Image();
var backgoundSpeed = 3;
backgroundImage.onload = function() {
	background = new Konva.Image({
		x: 0,
		y: 0,
		image: backgroundImage,
		width: size,
		height: height,
	});
	backgroundLayer.add(background)
	background2 = new Konva.Rect({
		x: 0,
		y: 550,
		fill: 'black',
		width: size,
		height: height,
	});
	backgroundLayer.add(background2)
	backgroundLoad = true
	background.cache()
	background2.cache()
	background.transformsEnabled('position');
	background2.transformsEnabled('position');
	background.listening(false)
	background2.listening(false)
	backgroundLayer.draw()
}
//Text layer
var textLayer = new Konva.Layer();
//Main layer Players,Stars,Spikes
var mainLayer = new Konva.Layer();
//Player Data
var player = new Konva.Rect({
	width: 50,
	height: 50,
	fill: '#580103',
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
player.listening(false)
mainLayer.add(player);
//starData Data + Animations
var star = new Konva.Star({
	width: 20,
	height: 20,
	fill: 'white',
	shadowColor: '#F8D092',
	shadowBlur: 20,
	shadowOpacity: 0.9,
	numPoints: 5,
	innerRadius: 20,
	outerRadius: 20,
	y: 50,
	x: 1200
});
mainLayer.add(star);
star.listening(false)
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
		sword.remove()
		swordOn = false
	}
}
//Main draw function
function update() {
	playerInputHandler()
	moveSpikes()
	moveEnemy()
	moveTexts()
	textLayer.draw()
	mainLayer.draw()
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

function moveSpikes() {
	spikes.forEach(function(spike, i) {
		if (spikes[i].getX() <= 0) {
			spikes[i].destroy()
			spikes.splice(i, 1)
			//refine spike parms
		} else if (checkCollisions(player.width(), player.height(), player.getX(), player.getY(), spikes[i].width() - 10, spikes[i].height() - 10, spikes[i].getX(), spikes[i].getY())) {
			loseGame()
		}
		spike.setX(spike.getX() - 2) //2 = speed
	})
}

function moveEnemy() {
	enemies.forEach(function(spike, i) {
		if (enemies[i].getX() <= 0) {
			enemies[i].destroy()
			enemies.splice(i, 1)
		} else if (checkCollisions(sword.width(), sword.height(), sword.getX(), sword.getY(), enemies[i].width() - 5, enemies[i].height() - 5, enemies[i].getX(), enemies[i].getY())) {
			if (swordOn) {
				//effect later?
				enemies[i].destroy()
				enemies.splice(i, 1)
			} else {
				loseGame()
			}
		}
		spike.setX(spike.getX() - 2) //2 = speed
	})
}

function animateStar() {
	if (starAnimType == "down") {
		starAnim += 0.1
		star.setY(starAnim)
	}
	if (starAnimType == "up") {
		starAnim -= 0.1
		star.setY(starAnim)
	}
	if (starAnim <= 50) {
		starAnimType = "down"
	} else if (starAnim >= 60) {
		starAnimType = "up"
	}
	starAnimLoop = window.requestAnimationFrame(animateStar);
}
starAnimLoop = window.requestAnimationFrame(animateStar);

function moveTexts() {
	textmap.forEach(function(text, i) {
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