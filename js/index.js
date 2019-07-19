var chooseGame = document.getElementById("choose-game");
var chooseBuilder = document.getElementById("choose-build");
var inputDiv = document.getElementById("enter-name");
var redirect = document.getElementById("redirect");
var nameField = document.getElementById("first-name");
var errName = document.getElementById('first-name-error');
var openCredits = document.getElementById("open-credits");
var creditsWindow = document.getElementById("credits-window");
var creditsOverlay = document.getElementById("semi-overlay");
var closeCredits = document.getElementById("close-credits");
chooseBuilder.onclick = () => {
	inputDiv.style.visibility = "visible";
	inputDiv.style.animation = "fade-in 1s ease-in-out";
	chooseBuilder.classList.add("selected");
	chooseGame.disabled = true;
	chooseBuilder.disabled = true;
	chooseGame.classList.add('disabled');
	inputOpened = true;
	redirect.onclick = () => {
		goToNameCheck("designer.html");
	};
};
openCredits.onclick = () => {
	creditsWindow.style.display = "block";
	creditsWindow.style.animation = "fade-in 1s";
	creditsOverlay.style.display = "block";
	creditsOverlay.style.animation = "fade-in 1s";
}
closeCredits.onclick = () => {
	creditsWindow.style.animation = "fade-out 1s";
	creditsOverlay.style.animation = "fade-out 1s";
	setTimeout(() => {
		creditsOverlay.style.display = "none";
		creditsWindow.style.display = "none";
	}, 990)
}
chooseGame.onclick = () => {
	inputDiv.style.visibility = "visible";
	inputDiv.style.animation = "fade-in 1s ease-in-out";
	chooseGame.classList.add("selected");
	chooseBuilder.disabled = true;
	chooseGame.disabled = true;
	chooseBuilder.classList.add('disabled');
	inputOpened = true;
	redirect.onclick = () => {
		goToNameCheck("game.html");
	};
};

function goToNameCheck(locationURL) {
	if (nameField.value.trim() == "") {
		errName.style.display = "block";
		errName.style.animation = "repeat-first-name 2s ease-in-out 0s 2";
		setTimeout(() => {
			errName.style.animation = "none";
			errName.style.display = "none";
		}, 4100);
	} else {
		document.querySelector("header").style.animation = "header-exit 3s ease-in-out";
		setTimeout(() => {
			document.querySelector("header").style.display = "none";
			for (var i = 0; i < document.querySelector("header").children.length; i++) {
				document.querySelector("header").children[i].style.animation = "none";
			}
		}, 2950);
		loader(locationURL, nameField.value.trim());
	}
}

function loader(locateURL, fName) {
    document.getElementById("loader").style.animation = "fade-in 1s ease-in-out";
	setTimeout(() => {
		lcdScreen.innerText = "Loading Influxion. . .";
    }, 5000)
    setTimeout(()=>{
        lcdScreen.innerText = "Loading Complete!";
    }, 7300);
	setTimeout(() => {
		location.href = locateURL + "?f=" + fName;
	}, 7900);
}
// Particles.JS
particlesJS.load('particles', 'assets/particles.json', function() {
	console.log('callback - particles.js config loaded');
});
// Song Called Wind - p00s
var menuMusic = new Audio('audio/main-screen.mp3');
window.onmouseover = () => {
	var promise = menuMusic.play();
	if (promise !== undefined) {
		promise.then(_ => {}).catch(error => {
			console.log(error);
		});
	}
}