var userScore = 0;
var userHP = 100;
var bossHP = 100;

var inGame = true;

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

function toFixed(num, fixed) {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
}
function checkPress(key){
  if(beats.hasOwnProperty(key.code) == false || inGame == false){
    return;
  }
  activateBeat(beats[key.code].element);
  var rnd = Math.floor(Math.random() * (4 - 1 + 1) + 1);
  var currentTime = parseFloat(toFixed(map.beats.notes[0].time,2));
  if (rnd == beats[key.code].number) {
    if (nextBeatTime - currentTime <= 0.1) {
      addRating("Perfect");
      updateScore(10);
    } 
    else if (nextBeatTime - currentTime <= 1) {
      addRating("Good");
      updateScore(5);
    } 
    else if(nextBeatTime = currentTime >= 1.4){
        addRating("Early");
        updateScore(0);
    }
  } 
  else {
    addRating("Wrong");
    updateScore(-10);
  }
}

function activateBeat(beat){
    beat.style.height = "350px";
    setTimeout(function(){
      beat.style.height = "50px";
    }, 300);
}

function addRating(rating){
  document.getElementById("ratings").innerText = rating; 
}