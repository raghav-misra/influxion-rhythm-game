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
function updateScore(score){

}

// Move boss to signal next beat:
function bossGoToKey(){
  while(rnd == lastRnd){
    rnd = Math.floor(Math.random() * (4 - 1 + 1) + 1);
  }
  lastRnd = rnd;
  switch(rnd){
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
function loadMIDI(path){
  load(path, function(data) {
    buildGame(data);
	});
}

function buildGame(data){
  var tmpMap = {
    arrayCounter: 0,
    beatArray: []
  };
  tmpMap.info = data.info;
  data.beats.notes.forEach(function(note){
		tmpMap.beatArray.push(note);
  });
  beatMap = tmpMap;
  song = new Howl({ src: ["maps/"+tmpMap.info.path] });
  song.on("load", function() { song.play(); });
  updateInterval = setInterval(updateGame, 1000 / 60);
}

// Update Function:
function updateGame(){
  var timeCurrentSong = song.seek();
  timeNextBeat = parseFloat(toFixed(beatMap.beatArray[beatMap.arrayCounter].time, 2));
	if(timeNextBeat - timeCurrentSong <= 2){
    console.log("That was beat #" + beatMap.arrayCounter);
    bossGoToKey();
    pressReady = true;
    beatMap.arrayCounter += 1;
    if(beatMap.arrayCounter >= beatMap.beatArray.length - 1){
      clearInterval(updateInterval);
      console.log("OMG We Finished The Map!");
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
function checkPress(key){
  if(beats.hasOwnProperty(key.code) == false || inGame == false || pressReady == false){
    return;
  }
  activateBeat(beats[key.code].element);
  pressReady = false;
  if (rnd == beats[key.code].number) {
    if (timeNextBeat - song.seek() <= 0.1) {
      addRating("Perfect");
      updateScore(10);
    } 
    else if (timeNextBeat - song.seek() <= 1) {
      addRating("Good");
      updateScore(5);
    } 
    else if(timeNextBeat = song.seek() >= 1.4){
      addRating("Early");
      updateScore(0);
    }
  } 
  else {
    addRating("Wrong");
    updateScore(-10);
  }
}


// Change UI of beat <div>s:
function activateBeat(beat){
    beat.style.height = "350px";
    setTimeout(function(){
      beat.style.height = "10px";
    }, 300);
}

// Change the rating to be [GOOD, PERFECT, EARLY, WRONG]:
function addRating(rating){
  document.getElementById("ratings").innerText = rating; 
}

// Code To Execute:
// loadMIDI("maps/onestop.json");