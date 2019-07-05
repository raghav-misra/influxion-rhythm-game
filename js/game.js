//load path dynamicly later
var path = "maps/onestop.json"
var map = {error:true}
var spikes = []
loadMap(path) // loads the map data

function loadMap(path) {
	load(path, function(data) {
		loadGame(data)
	})
}



function loadGame(data){
  map = data
  map.beats.notes.forEach(function(note){
    spikes.push(note)
  })
  setInterval(update, 1000 / 30); //30fps
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