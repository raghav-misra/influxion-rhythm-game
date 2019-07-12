var game = document.getElementById('canvas');
var cutsceneDiv = document.getElementById('cutscene')
var stageCutscene = new Konva.Stage({
	container: 'cutscene', // id of container <div>
	width: size,
	height: height
});
var cutsceneLayer1 = new Konva.FastLayer();
var cutsceneLayer0 = new Konva.FastLayer();

function bossIntroCutscene(xpathsong) {
	game.classList.add('fade-out')
	setTimeout(function() {
		cutsceneDiv = document.getElementById('cutscene')
		game.classList.remove('fade-out')
		game.classList.add('hide')
		cutsceneDiv.classList.remove('hide')
		//Custom objects used in this cutscene
		var redStar = new Konva.Star({
			width: 15,
			height: 15,
			fill: '#db3f3f',
			shadowColor: '#F8D092',
			shadowBlur: 20,
			shadowOpacity: 0.9,
			numPoints: 5,
			innerRadius: 15,
			outerRadius: 15,
			y: 50,
			x: 600
		});
		var blueStar = new Konva.Star({
			width: 15,
			height: 15,
			fill: '#6495ed',
			shadowColor: '#F8D092',
			shadowBlur: 20,
			shadowOpacity: 0.9,
			numPoints: 5,
			innerRadius: 15,
			outerRadius: 15,
			y: 50,
			x: 600
		});
		var yellowStar = new Konva.Star({
			width: 15,
			height: 15,
			fill: '#fafa24',
			shadowColor: '#F8D092',
			shadowBlur: 20,
			shadowOpacity: 0.9,
			numPoints: 5,
			innerRadius: 15,
			outerRadius: 15,
			y: 50,
			x: 600
		});
		var greenStar = new Konva.Star({
			width: 15,
			height: 15,
			fill: '#39b639',
			shadowColor: '#F8D092',
			shadowBlur: 20,
			shadowOpacity: 0.9,
			numPoints: 5,
			innerRadius: 15,
			outerRadius: 15,
			y: 50,
			x: 600
		});
		var textCut = new Konva.Text({
			x: 400,
			y: 10,
			opacity: 0,
			text: 'You reached the end of the level...',
			fontSize: 30,
			fontFamily: 'Oswald',
			fill: 'white'
		});
		var textCut1 = new Konva.Text({
			x: 400,
			y: 50,
			opacity: 0,
			text: 'Now that you have learned the flow of this song..',
			fontSize: 30,
			fontFamily: 'Oswald',
			fill: 'white'
		});
		var textCut2 = new Konva.Text({
			x: 400,
			opacity: 0,
			y: 90,
			text: 'Its time for your final test..',
			fontSize: 30,
			fontFamily: 'Oswald',
			fill: 'white'
		});
		//Add  needed layers to stageCutscene
		stageCutscene.add(cutsceneLayer1)
		stageCutscene.add(cutsceneLayer0)
		//Add the objects needed for this cutscene
		cutsceneLayer0.add(background3)
		cutsceneLayer0.add(background)
		cutsceneLayer0.add(background2) //ground
		cutsceneLayer1.add(star)
		cutsceneLayer1.add(player)
		//Draw the layers
		cutsceneLayer1.draw()
		cutsceneLayer1.draw()
		cutsceneLayer1.draw()
		cutsceneLayer0.draw()
		//Animations used in this cutscene
		soundEffects.starMove.play()
		star.to({
			x: 600,
			duration: 5,
			easing: Konva.Easings.StrongEaseInOut,
			onFinish: () => {
				cutsceneLayer1.add(greenStar)
				cutsceneLayer1.add(yellowStar)
				cutsceneLayer1.add(redStar)
				cutsceneLayer1.add(blueStar)
				star.opacity(0)
				cutsceneLayer1.draw()
				soundEffects.starExplosion.play()
				redStar.to({
					x: 500,
					duration: 1,
				})
				yellowStar.to({
					x: 700,
					duration: 1,
				})
				greenStar.to({
					x: 800,
					duration: 1,
					onFinish: () => {
						soundEffects.starMove.play()
						redStar.to({
							x: 500,
							y: 700,
							duration: 1,
						})
						blueStar.to({
							x: 600,
							y: 700,
							duration: 1,
						})
						yellowStar.to({
							x: 700,
							y: 700,
							duration: 1,
						})
						greenStar.to({
							x: 800,
							y: 700,
							duration: 1,
							onFinish: () => {
								cutsceneLayer1.add(textCut)
								cutsceneLayer1.add(textCut1)
								cutsceneLayer1.add(textCut2)
								cutsceneLayer1.draw();
								textCut.to({
									opacity: 1,
									duration: 1
								})
								textCut1.to({
									opacity: 1,
									duration: 1
								})
								textCut2.to({
									opacity: 1,
									duration: 1
								})
								soundEffects.bossTalk.play()
								setTimeout(() => {
									openBossDiv(xpathsong);
								}, 5000);
							}
						})
					}
				})
			}
		})
		player.to({
			x: 600,
			duration: 2
		})
	}, 1000)
}

function openBossDiv(xpathsong) {
	cutsceneLayer0.remove()
	cutsceneLayer1.remove()
	cutsceneDiv.classList.add('fade-out')
	setTimeout(function() {
		document.getElementById('boss-battle-ui').classList.remove('hide')
		loadMIDI(xpathsong);
		cutsceneDiv.classList.add('hide')
	}, 5000)
}