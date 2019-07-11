// Custom Alert:
var popupBox = document.getElementById("popup");
var popupBoxTitle = document.getElementById("popup-title");
var popupBoxBody = document.getElementById("popup-body");
var popupBoxBtn = document.getElementById("popup-btn");

var popup = {
	hide: ()=>{
		popupBoxBtn.onclick = ()=>{};
		popupBox.style.animation = "fade-out 0.5s";
		setTimeout(()=>{
			popupBox.style.animation = "none";
			popupBox.classList.add("hide");
		}, 400);
	},

	show: (title, body, btnText="Okay", callBack=()=>{})=>{
		popupBoxTitle.innerText = title;
		popupBoxBtn.innerText = btnText
		popupBox.classList.remove("hide");
		popupBox.style.animation = "fade-in 0.5s";
		setTimeout(()=>{
			popupBox.style.animation = "none";
			popupBoxBtn.onclick = ()=>{
				popup.hide();
				return callBack();
			};
		}, 400);
	}
}

// "Dynamic" Level Generator: