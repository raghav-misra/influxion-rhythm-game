var dataArray = {
	"firstName": "",
	"stars": 0,
	"levels": {
		tutorial: {
			completed: false,
			starsEarned: 0,
			metadata: {
				difficulty: "easy",
				number: "00",
				name: "Tutorial",
				song: "Onestop",
				artist: "David Yackley",
				mapLocation: "maps/onestop.json"
			}
		},
		cityscape: {
			completed: false,
			starsEarned: 0,
			metadata: {
				difficulty: "easy",
				number: "01",
				name: "Cityscape", 
				song: "Town", 
				artist: "Nathan Grigg",
				mapLocation: "maps/town.json"
			}
		},
		paradise: {
			completed: false,
			starsEarned: 0,
			metadata: {
				difficulty: "normal",
				number: "02",
				name: "Paradise", 
				song: "Gangsta's Paradise", 
				artist: "Jennifer Spengler",
				mapLocation: "maps/gangstasparadise.json"
			}
		}
	}
};

// Update function
function updateStorage(){
	localStorage.setItem(
		dataArray.firstName.toUpperCase()+"Store", 
		JSON.stringify(dataArray)	
	);
	document.getElementById("star-amount").innerText = dataArray.stars.toString();
	setTimeout(updateStorage, 5000);
}

// "Dynamic" Level Generator:
var levelCode = "<div data-completed=\"{0}\" class=\"lvl {1}\"><div class=\"lvl-number\">{2}</div><div class=\"lvl-name\">{3}</div><div class=\"lvl-song-info\"><span class=\"lvl-song s-name\">Song:&nbsp;{4}</span><hr><span class=\"lvl-song s-artist\">Artist:&nbsp;{5}</span></div><div class=\"lvl-star-rating\"><i class=\"far fa-star\"></i><i class=\"far fa-star\"></i><i class=\"far fa-star\"></i></div><div class=\"lvl-btn-contain\"><button onclick=\"path='{6}';loadMap('{7}');\" class=\"lvl-btn btn\">Play!</button></div></div>";

var levelList = document.getElementById("level-list");

String.prototype.format = function() {
	var args = arguments;
	return this.replace(/{(\d+)}/g, function(match, number) { 
		return typeof args[number] != 'undefined'
			? args[number]
			: match
		;
	});
};

function createLevel(lvlObject){
	var tmp = levelCode;
	tmp = tmp.format(
		lvlObject.completed.toString(),
		lvlObject.metadata.difficulty, 
		lvlObject.metadata.number, 
		lvlObject.metadata.name, 
		lvlObject.metadata.song, 
		lvlObject.metadata.artist, 
		lvlObject.metadata.mapLocation,
		lvlObject.metadata.mapLocation
	);
	if(lvlObject.starsEarned >= 1){
		tmp = tmp.replace("far", "fas");
	}
	if(lvlObject.starsEarned >= 2){
		tmp = tmp.replace("far", "fas");
	}
	if(lvlObject.starsEarned == 3){
		tmp = tmp.replace("far", "fas");
	}
	levelList.innerHTML = levelList.innerHTML + tmp;
}

// Create Levels:
function buildLevels(){
	dataArray.stars = 0;
	levelList.innerHTML = "";
	for (var lvlProp in dataArray["levels"]) {
		if(dataArray["levels"].hasOwnProperty(lvlProp)){
			dataArray.stars += dataArray.levels[lvlProp].starsEarned;
			createLevel(dataArray.levels[lvlProp]);
		}
	}
}
buildLevels();

// Get First Name
dataArray.firstName = decodeURI(location.search.replace("?f=", "").toUpperCase());
if(dataArray.firstName.trim() == "") 
	dataArray.firstName = infinitePrompt("What's your first name?").trim().toUpperCase();
setTimeout(()=>{
	popup.show(
		"Welcome!", 
		("Hey " + dataArray.firstName).trim() + "! Welcome To Influxion!", 
		"Let's Play!"
	);
}, 500);

// Get From LocalStorage:
if (localStorage.getItem(dataArray.firstName.toUpperCase()+"Store") !== null){
	dataArray = JSON.parse(
		localStorage.getItem(dataArray.firstName.toUpperCase()+"Store")
	);
}
else{
	localStorage.setItem(
		dataArray.firstName.toUpperCase()+"Store", 
		JSON.stringify(dataArray)	
	);
}
updateStorage();

// utils
function infinitePrompt(query, repeat = false){
	var ans = prompt(query);
	if(ans == null || ans.trim() == ""){
		if(repeat) return infinitePrompt(query, true);
		else return infinitePrompt("Let's try that again: " + query, true);
	}
	else return ans;
}
