// Custom Alert:
var popupBox = document.getElementById("popup");
var popupBoxTitle = document.getElementById("popup-title");
var popupBoxBody = document.getElementById("popup-body");
var popupBoxBtn = document.getElementById("popup-btn");

var popup = {
	hide: ()=>{
		popupBoxBtn.onclick = ()=>{};
		popupBox.style.animation = "fade-out 0.75s";
		setTimeout(()=>{
			popupBox.style.animation = "none";
			popupBox.classList.add("hide");
		}, 625);
	},

	show: (title, body, btnText="Okay", callBack=()=>{})=>{
		popupBoxTitle.innerText = title;
		popupBoxBody.innerHTML = body;
		popupBoxBtn.innerText = btnText;
		popupBox.classList.remove("hide");
		popupBox.style.animation = "fade-in 0.75s";
		setTimeout(()=>{
			popupBox.style.animation = "none";
			popupBoxBtn.onclick = ()=>{
				popup.hide();
				return callBack();
			};
		}, 625);
	}
}

// "Dynamic" Level Generator:


// Startup Code:
var firstName = location.search.replace("?f=", "");
popup.show(
	"Welcome!", 
	("Yo " + firstName).trim() + "! Welcome To Influxion!", 
	"Let's Play!"
);