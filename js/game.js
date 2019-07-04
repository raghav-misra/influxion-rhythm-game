// Querystring lib:
var querystring={parse:function(n){var o={};if("string"==typeof(n=void 0!==n?n:window.location.search)&&n.length>0){"?"===n[0]&&(n=n.substring(1));for(var e=0,r=(n=n.split("&")).length;r>e;e++){var t,i,s=n[e],a=s.indexOf("=");a>=0?(t=s.substr(0,a),i=s.substr(a+1)):(t=s,i=""),i=decodeURIComponent(i),void 0===o[t]?o[t]=i:o[t]instanceof Array?o[t].push(i):o[t]=[o[t],i]}}return o},stringify:function(n){var o=[];if(n&&n.constructor===Object)for(var e in n)if(n[e]instanceof Array)for(var r=0,t=n[e].length;t>r;r++)o.push([encodeURIComponent(e),encodeURIComponent(n[e][r])].join("="));else o.push([encodeURIComponent(e),encodeURIComponent(n[e])].join("="));return o.join("&")}};

// Glubbal Voriables:
var firstName = getFirstName();

// Retrieve First Name:
function getFirstName(){
    var tmp = "";
    try{
        tmp = querystring.parse().f.toString();
    }
    catch(e){
        tmp = prompt("Please Enter Your First Name:").trim();
        location.search = "?f=" + tmp;
    }
    return tmp;
}


// Rating based on beat speed:
function addRating(ele, ratingtype) { //Add rating under button
	var rating = document.createElement("h2")
	rating.innerText = ratingtype
	rating.classList.add('rating')
	rating.classList.add(ratingtype)
	ele.appendChild(rating)
	setTimeout(function() {
		rating.parentElement.removeChild(rating)
	}, 1000)
}

// Variables:
var inGame = true
var lastBeat = 1
var beatStage = 2
var tutBeat = false;
// Starter Code & MIDI init
var Player = new MidiPlayer.Player(function(event) {
	console.log(event);
});
var ac = new AudioContext()
Soundfont.instrument(ac, 'clavinet').then(function (clavinet) {
    clavinet.play('C4')
  })

// Beats:
var beat1 = {
    element: document.getElementById("beat1"),
    color: "#F83D3D",
    
}
var beat2 = {
    element: document.getElementById("beat2"),
    color: "#2BD1FC",
    
}
var beat3 = {
    element: document.getElementById("beat3"),
    color: "#F3EA5F",
    
}
var beat4 = {
    element: document.getElementById("beat4"),
    color: "#95F51F",
    
}

// ASDF In-Game Key a
function input(key){
    if(key.code == "KeyA" && inGame &&  lastBeat !== beatStage ){
        active(beat1)

    /*    if(map[beatStage].beat == 1){
            if(map[beatStage].time - music.currentTime <= 0.1 ){
                addRating(beat1.element,"Perfect")
                lastBeat = beatStage
                updateScore(10)

            }
            else if(map[beatStage].time - music.currentTime <= 1 ){
                addRating(beat1.element,"Good")
                updateScore(5)
                lastBeat = beatStage
            }else if(map[beatStage].time = music.currentTime >=1.4 ){
                addRating(beat1.element,"Early")
                updateScore(0)
                lastBeat = beatStage
               
            }

        }else{

            addRating(beat1.element,"Wrong")
            updateScore(-10)
            
            

        }*/
    }
    if(key.code == "KeyS" && inGame && lastBeat !== beatStage ){
        active(beat2)
       /* if(map[beatStage].beat == 2){
            if(map[beatStage].time - music.currentTime <= 0.1 ){
                addRating(beat2.element,"Perfect")
                
                updateScore(10)

            }
            else if(map[beatStage].time - music.currentTime <= 0.5 ){
                addRating(beat2.element,"Good")
                
                updateScore(5)
            }else if(map[beatStage].time = music.currentTime >=1 ){
                addRating(beat2.element,"Early")
                lastBeat = beatStage;
                updateScore(0)
            }

        }else{

            addRating(beat2.element,"Wrong")
            
            updateScore(-10)

        } */
    }
    if(key.code == "KeyD" && lastBeat !== beatStage && inGame  ){
        active(beat3)
        /*
        if(map[beatStage].beat == 3){
            if(map[beatStage].time - music.currentTime <= 0.1 ){
                addRating(beat3.element,"Perfect")
                lastBeat = beatStage
                updateScore(10)
            }
            else if(map[beatStage].time - music.currentTime <= 1 ){
                addRating(beat3.element,"Good")
                lastBeat = beatStage
                updateScore(5)
            }else if(map[beatStage].time = music.currentTime >=1.4 ){
                addRating(beat3.element,"Early")
                lastBeat = beatStage
                updateScore(0)
            }

        }else{

            addRating(beat3.element,"Wrong")
            
            updateScore(-10)
            

        }*/
    }
    if(key.code == "KeyF" && inGame &&  lastBeat !== beatStage ){
        active(beat4)
        /*
        if(map[beatStage].beat == 4 && lastBeat !== beatStage){
            if(map[beatStage].time - music.currentTime <= 0.1 ){
                addRating(beat4.element,"Perfect")
                lastBeat = beatStage
                updateScore(10)
            }
            else if(map[beatStage].time - music.currentTime <= 1 ){
                addRating(beat4.element,"Good")
                lastBeat = beatStage
                updateScore(5)
            }else if(map[beatStage].time = music.currentTime >= 1.4 ){
                addRating(beat4.element,"Early")
                lastBeat = beatStage
                updateScore(0)
            }

        }else{

            addRating(beat4.element,"Wrong")
            
            updateScore(-10)

        }
        */
    }
}

// CSS Beat Effects
function active(beat){
    beat.element.style.transform = "scaleY(100)";
    if(beat !== tutBeat){
    backgroundManager()
    }
    setTimeout(function(){
        unactive(beat)
    },200)

}
function unactive(beat){
    beat.element.style.transform = "scaleY(1)"
    beat.element.style.boxShadow = "0px 0px 0px 0px" + beat.color
}




function backgroundManager(){
    console.log('hi')

}