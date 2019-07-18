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
				mapLocation: "maps/onestop.json",
				background: "backgrounds/dark-mtns.png",
				songNameColor: "white"
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
				mapLocation: "maps/town.json",
				background: "backgrounds/dark-mtns.png",
				songNameColor: "white"
			}
		},
		talkbox: {
			completed: false,
			starsEarned: 0,
			metadata: {
				difficulty: "easy",
				number: "02",
				name: "TalkBox", 
				song: "TalkBox", 
				artist: "Dj Quads",
				mapLocation: "maps/talkbox.json",
				background: "backgrounds/dark-mtns.png",
				songNameColor: "white"
			}
		},
		paradise: {
			completed: false,
			starsEarned: 0,
			metadata: {
				difficulty: "normal",
				number: "03",
				name: "Paradise", 
				song: "Gangsta’s Paradise", 
				artist: "Jennifer Spengler",
				mapLocation: "maps/gangstasparadise.json",
				background: "backgrounds/dark-mtns.png",
				songNameColor: "white"
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
/* old
// "Dynamic" Level Generator:
var levelCode = "<div data-completed=\"{0}\" class=\"lvl {1}\"><div class=\"lvl-number\">{2}</div><div class=\"lvl-name\">{3}</div><div class=\"lvl-song-info\"><span class=\"lvl-song s-name\">Song:&nbsp;{4}</span><hr><span class=\"lvl-song s-artist\">Artist:&nbsp;{5}</span></div><div class=\"lvl-star-rating\"><i class=\"far fa-star\"></i><i class=\"far fa-star\"></i><i class=\"far fa-star\"></i></div><div class=\"lvl-btn-contain\"><button onclick=\"path='{6}';showCd('{3}');setTimeout(function(){loadMap('{7}')},2000);\" class=\"lvl-btn btn\">Play!</button></div></div>";

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
*/
// "Dynamic" Level Generator:
var levelCode = "<div style='background-image: url(\"{0}\"); background-size: cover; background-position: center;' data-completed=\"{1}\" class=\"lvl {2}\"><div class=\"lvl-number\">{3}</div><div class=\"lvl-name\">{4}</div><div class=\"lvl-song-info\"><span style='color:{5}' class=\"lvl-song s-name\">{6}</span><div class=\"lvl-star-rating\"><i class=\"far fa-star\"></i><i class=\"far fa-star\"></i><i class=\"far fa-star\"></i><i class=\"far fa-star\"></i></div><div class=\"lvl-btn-contain\"><button onclick=\"path='{7}';showCd('{8}');setTimeout(function(){loadMap('{9}'); },2000);\" class=\"lvl-btn btn\">Play!</button></div></div>";

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
		lvlObject.metadata.background,
		lvlObject.completed.toString(),
		lvlObject.metadata.difficulty,
		lvlObject.metadata.number,
		lvlObject.metadata.name,
		lvlObject.metadata.songNameColor,
		lvlObject.metadata.song,
		lvlObject.metadata.mapLocation,
		lvlObject.metadata.song,
		lvlObject.metadata.mapLocation
	);
	if(lvlObject.starsEarned >= 1){
		tmp = tmp.replace("far", "fas");
	}
	if(lvlObject.starsEarned >= 2){
		tmp = tmp.replace("far", "fas");
	}
	if(lvlObject.starsEarned >= 3){
		tmp = tmp.replace("far", "fas");
	}
	if(lvlObject.starsEarned >= 4){
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
buildLevels();

// utils
function infinitePrompt(query, repeat = false){
	var ans = prompt(query);
	if(ans == null || ans.trim() == ""){
		if(repeat) return infinitePrompt(query, true);
		else return infinitePrompt("Let's try that again: " + query, true);
	}
	else return ans;
}
