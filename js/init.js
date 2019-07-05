//create the game canvas and player
var size = window.innerWidth;
var height = window.innerHeight;
var music = new Howl({
      src: ['maps/onestop.wav']
    });
var gravity = 0.3;
var keys = []
var jumpAnim
var stage = new Konva.Stage({
    container: 'canvas', // id of container <div>
    width: size,
    height: height
});
var mainLayer = new Konva.Layer();
window.onkeydown = function(event) {
    keys[event.key] = true;
};
window.onkeyup = function(event) {
    keys[event.key] = false;
};
//Player Data
var player = new Konva.Circle({
    radius: 40,
    width: 50,
    height: 50,
    fill: 'red',
    y: 500,
    x: 40
});
var playerPosition = {
    x: 40,
    y: 500,
    speedY: 5,
    jump: false
}
mainLayer.add(player);


//Spike
function createSpike(){
    var spike = new Konva.Wedge({
        radius: 70,
        angle: 60,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 4,
        rotation: -120
    });
    console.log(spike)
    mainLayer.add(spike)
}


window.onkeydown = function(event) {
    keys[event.key] = true;
};
window.onkeyup = function(event) {
    keys[event.key] = false;
};

stage.add(mainLayer);

//Player input handler
function playerInputHandler() {
    if (keys[" "] == true) {
        if (playerPosition.jump == false) {
            playerPosition.jump = true
            playerPosition.speedY = 8
            player.setY(499)
            jumpAnim = window.requestAnimationFrame(jump)


        }
    }


}
//Main draw function

function update() {
    playerInputHandler()
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