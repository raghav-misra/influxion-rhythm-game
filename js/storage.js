
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
                background: "backgrounds/Cityscape.png",
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
                background: "backgrounds/TalkBox.png",
                songNameColor: "white"
            }
        },
        electro: {
            completed: false,
            starsEarned: 0,
            metadata: {
                difficulty: "easy",
                number: "03",
                name: "Electro",
                song: "Electro Cabello",
                artist: "Kevin MacLeod",
                mapLocation: "maps/electrocabello.json",
                background: "backgrounds/electro.png",
                songNameColor: "white"
            }
        },
        flares: {
            completed: false,
            starsEarned: 0,
            metadata: {
                difficulty: "normal",
                number: "04",
                name: "Flares",
                song: "Flares",
                artist: "NIVIRO",
                mapLocation: "maps/flares.json",
                background: "backgrounds/flares.png",
                songNameColor: "white"
            }
        },
        paradise: {
            completed: false,
            starsEarned: 0,
            metadata: {
                difficulty: "normal",
                number: "05",
                name: "Paradise",
                song: "Gangsta’s Paradise",
                artist: "Jennifer Spengler",
                mapLocation: "maps/gangstasparadise.json",
                background: "backgrounds/dark-mtns.png",
                songNameColor: "white"
            }
        },
        skii: {
            completed: false,
            starsEarned: 0,
            metadata: {
                difficulty: "difficult",
                number: "06",
                name: "Skii",
                song: "Skii",
                artist: "Iscopizza X Lil Scar",
                mapLocation: "maps/skii.json",
                background: "backgrounds/dark-mtns.png",
                songNameColor: "white"
            }
        }
    }

};

// Update function
function updateStorage() {
    localStorage.setItem(
        dataArray.firstName.toUpperCase() + "Store",
        JSON.stringify(dataArray)
    );
    document.getElementById("star-amount").innerText = dataArray.stars.toString();
    setTimeout(updateStorage, 5000);
}

// "Dynamic" Level Generator:
var levelCode = "<div style='background-image: url(\"{0}\"); background-size: cover; background-position: center;' data-completed=\"{1}\" class=\"lvl {2}\"><div class=\"lvl-number\">{3}</div><div class=\"lvl-name\">{4}</div><div class=\"lvl-song-info\"><span style='color:{5}' class=\"lvl-song s-name\">{6}</span><div class=\"lvl-star-rating\"><i class=\"far fa-star\"></i><i class=\"far fa-star\"></i><i class=\"far fa-star\"></i><i class=\"far fa-star\"></i></div><div class=\"lvl-btn-contain\"><button onclick=\"document.getElementById('levels').style.backgroundImage = 'none';path='{7}';showCd('{8}');setTimeout(function(){loadMap('{9}'); },2000);\" class=\"lvl-btn btn\">Play!</button></div></div>";

var levelList = document.getElementById("level-list");

String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined' ?
            args[number] :
            match;
    });
};

function createLevel(lvlObject,c = false, id = null) {
    if(c){//community levels
         levelCode = "<div style='background-image: url(\"{0}\"); background-size: cover; background-position: center;' class='lvl community'> <div class=\"lvl-number\">{3}</div> <div class=\"lvl-name\">{1}</div> <div class=\"lvl-song-info\"><span style='white' class=\"lvl-song s-name\">{2}</span> <div class=\"lvl-btn-contain\"><button onclick=\"document.getElementById('levels').style.backgroundImage='none' ;path='{3}' ;showCd('{1}');setTimeout(function(){loadMapC({3}); },2000);\" class=\"lvl-btn btn\">Play!</button></div> </div> </div>";
         console.log(lvlObject)
         var tmp = levelCode;
         tmp = tmp.format(
             lvlObject.info.background,
             lvlObject.info.levelName,
             lvlObject.info.songName,
             id,
            
         );
         var e = document.createElement('span')
         e.innerHTML = tmp;
         document.getElementById('level-list-c').appendChild(e);
         
    }else{ // main levels
    levelCode = "<div style='background-image: url(\"{0}\"); background-size: cover; background-position: center;' data-completed=\"{1}\" class=\"lvl {2}\"><div class=\"lvl-number\">{3}</div><div class=\"lvl-name\">{4}</div><div class=\"lvl-song-info\"><span style='color:{5}' class=\"lvl-song s-name\">{6}</span><div class=\"lvl-star-rating\"><i class=\"far fa-star\"></i><i class=\"far fa-star\"></i><i class=\"far fa-star\"></i><i class=\"far fa-star\"></i></div><div class=\"lvl-btn-contain\"><button onclick=\"document.getElementById('levels').style.backgroundImage = 'none';path='{7}';showCd('{8}');setTimeout(function(){loadMap('{9}'); },2000);\" class=\"lvl-btn btn\">Play!</button></div></div>";
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
    if (lvlObject.starsEarned >= 1) {
        tmp = tmp.replace("far", "fas");
    }
    if (lvlObject.starsEarned >= 2) {
        tmp = tmp.replace("far", "fas");
    }
    if (lvlObject.starsEarned >= 3) {
        tmp = tmp.replace("far", "fas");
    }
    if (lvlObject.starsEarned >= 4) {
        tmp = tmp.replace("far", "fas");
    }
    var e = document.createElement('span')
    e.innerHTML = tmp;
    levelList.appendChild(e);
    }
}

// Create Levels:
function buildLevels() {
    dataArray.stars = 0;
    levelList.innerHTML = "";
    for (var lvlProp in dataArray["levels"]) {
        if (dataArray["levels"].hasOwnProperty(lvlProp)) {
            dataArray.stars += dataArray.levels[lvlProp].starsEarned;
            createLevel(dataArray.levels[lvlProp]);
        }
    }
}
var communityData
function buildCommunity(){
    async function getUserAsync() {
        let response = await fetch('https://www.jsonstore.io/a3a8e80eeb67eb27e906c949aaa072678e04093c4febf8d145015c7819fd1843/maps');
        let data = await response.json()
        return data;
    }
    getUserAsync().then(function(data) {
        console.log(data)
         communityData = data.result || []; // In case result is null/undefined
         communityData.forEach(function(map,id){
            createLevel(map,true,id)
         })
    });
  
}

// Get First Name
dataArray.firstName = decodeURI(location.search.replace("?f=", "").toUpperCase());
if (dataArray.firstName.trim() == "")
    dataArray.firstName = infinitePrompt("What's your first name?").trim().toUpperCase();
setTimeout(() => {
    popup.show(
        "Welcome!",
        ("Hey " + dataArray.firstName).trim() + "! Welcome To Influxion!",
        "Let's Play!"
    );
}, 500);

// Get From LocalStorage:
if (localStorage.getItem(dataArray.firstName.toUpperCase() + "Store") !== null) {
    dataArray = JSON.parse(
        localStorage.getItem(dataArray.firstName.toUpperCase() + "Store")
    );
} else {
    localStorage.setItem(
        dataArray.firstName.toUpperCase() + "Store",
        JSON.stringify(dataArray)
    );
}
updateStorage();
buildLevels();
buildCommunity();

// utils
function infinitePrompt(query, repeat = false) {
    var ans = prompt(query);
    if (ans == null || ans.trim() == "") {
        if (repeat) return infinitePrompt(query, true);
        else return infinitePrompt("Let's try that again: " + query, true);
    } else return ans;
}

function load(path, success, error) {
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