
var effectElement = document.getElementById('canvas')
var effectReady = true
//Effects for in game use
var effects = {
    shakes: {
    shake: (seconds) =>{
        if(effectReady){
        console.log('asd')
        effectReady = false
        effectElement.style.animation = "shake backwards " + seconds + "s"
        stopEffect(seconds)
        }

    },
    shakeFastTop: (seconds) =>{
        if(effectReady){
        console.log('asd')
        effectReady = false
        effectElement.style.animation = "shakeFastTop backwards " + seconds + "s"
        stopEffect(seconds)
        }

    },
    shakeFastBottom: (seconds) =>{
        if(effectReady){
        console.log('asd')
        effectReady = false
        effectElement.style.animation = "shakeFastBottom backwards " + seconds + "s"
        stopEffect(seconds)
        }

    },
    shakeFastRight: (seconds) =>{
        if(effectReady){
        console.log('asd')
        effectReady = false
        effectElement.style.animation = "shakeFastRight backwards " + seconds + "s"
        stopEffect(seconds)
        }

    },
    shakeFastLeft: (seconds) =>{
        if(effectReady){
        console.log('asd')
        effectReady = false
        effectElement.style.animation = "shakeFastLeft backwards " + seconds + "s"
        stopEffect(seconds)
        }

    }
},
filters: {
    shake: (seconds) =>{
        if(effectReady){
        console.log('asd')
        effectReady = false
        effectElement.style.animation = "shake backwards " + seconds + "s"
        stopEffect(seconds)
        }
}
    
  
}

//stop effect
function stopEffect(seconds){
    setTimeout(function(){
        console.log('off')
        effectElement.style.animation = "none"
        effectReady = true
    },seconds * 1000)
}



