//load path dynamicly later
var path = "maps/onestop.json"
var map = {error:true}
var spikesData = []
var spikes = []
var beatStage = 0
var timeUntilNextBeat = 0
loadMap(path) // loads the map data

function loadMap(path) {
	load(path, function(data) {
		loadGame(data)
	})
}
function loadGame(data){
  map = data
  map.beats.notes.forEach(function(note){
    spikesData.push(note)
  })
  music.src = "maps/" + map.info.path
  music.on("load", function(){

    music.play()
    spikeManager()
  })
  setInterval(update, 1000 / 60); //60fps
}


//spikes
function createSpike(){
   var spike = new Konva.RegularPolygon({ //spike drawer
        x: 800,
        y:100,
        sides: 3,
        radius: 20,
        fill: 'white'
      });
  var drop = new Konva.Tween({
  node: spike,
   x: 800,
   y:545,
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
function spikeManager(){//Creates spikes to beat
 var currentTime = music.seek()
 var nextBeatTime = parseFloat(toFixed(map.beats.notes[beatStage].time,2))
 timeUntilNextBeat = nextBeatTime  - currentTime - 5.5 //Get time until next beat -6 is how long it takes for the spike to load
 beatStage++
 setTimeout(function(){
   createSpike()
   spikeManager()
 },timeUntilNextBeat * 1000) //seconds to miliseconds

}




//utils
function load(path, success, error) 
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
function toFixed(num, fixed) {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
}