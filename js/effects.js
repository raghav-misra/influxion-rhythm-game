var effectElement = document.getElementById('canvas')
var effectReady = true
//Effects for in game use
var effects = {
        shakes: {
            shake: (seconds) => {
                if (effectReady) {
                    
                    effectReady = false
                    effectElement.style.animation = "shake backwards " + seconds + "s"
                    stopEffect(seconds)
                }

            },
            shakeFastTop: (seconds) => {
                if (effectReady) {
                    
                    effectReady = false
                    effectElement.style.animation = "shakeFastTop backwards " + seconds + "s"
                    stopEffect(seconds)
                }

            },
            shakeFastBottom: (seconds) => {
                if (effectReady) {
                    
                    effectReady = false
                    effectElement.style.animation = "shakeFastBottom backwards " + seconds + "s"
                    stopEffect(seconds)
                }

            },
            shakeFastRight: (seconds) => {
                if (effectReady) {
                    
                    effectReady = false
                    effectElement.style.animation = "shakeFastRight backwards " + seconds + "s"
                    stopEffect(seconds)
                }

            },
            shakeFastLeft: (seconds) => {
                if (effectReady) {
                    
                    effectReady = false
                    effectElement.style.animation = "shakeFastLeft backwards " + seconds + "s"
                    stopEffect(seconds)
                }

            }
        },
        filters: {

            flash: (seconds) => {
                if (effectReady) {
                    
                    effectReady = false
                    effectElement.style.animation = "flash backwards " + seconds + "s"
                    stopEffect(seconds)
                }
            },
                flashStrong: (seconds) => {
                    if (effectReady) {
                        
                        effectReady = false
                        effectElement.style.animation = "flashStrong backwards " + seconds + "s"
                        stopEffect(seconds)
                    }

                },
                invert: (seconds) => {
                    if (effectReady) {
                        effectReady = true // allow invert to be interupted 
                        effectElement.style.animation = "invert " + seconds + "s forwards" 
                        
                    }

                },
                uninvert: (seconds) => {
                    if (effectReady) {
                        effectReady = false
                        effectElement.style.animation = "uninvert " + seconds + "s forwards" 
                        stopEffect(seconds)
                        
                    }

                }



            },
        bounces:{
            bounceFoward: (seconds) => {
                if (effectReady) {
                    
                    effectReady = false
                    effectElement.style.animation = "bounceFoward backwards " + seconds + "s"
                    stopEffect(seconds)
                }

            }
        },
        flips:{
            horizontal: () => {
               
                 
                    effectElement.style.transform = "rotateY(180deg)"
                
                

            },
            vertical: () => {
               
                 
                effectElement.style.transform = "rotateX(180deg)"
            
            

        },
        remove: () => {
               
                 
            effectElement.style.transform = "rotateX(0deg)"
            effectElement.style.transform = "rotateY(0deg)"
        
        

    }
        }
        }

        //stop effect
        function stopEffect(seconds) {
            setTimeout(function () {
                effectElement.style.animation = "none"
                effectReady = true
            }, seconds * 1000)
        }