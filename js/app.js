document.addEventListener("DOMContentLoaded", () => {
let callChar = document.getElementById("char");
let button1 = document.querySelector('.start');
let button2 = document.querySelector('.htp');
let callGame = document.getElementById("game");
let gameOverPic = document.querySelector(".gameOver");
let jumpAudio = document.getElementById("jump audio");


button1.addEventListener("click", (e) => {
    e.preventDefault();
    button1.remove();
    button2.remove();
    callGame.style.display = "block";
    document.body.style.background = "none";
    gameOverPic.style.display = "none";
    document.body.style.backgroundColor = "slateblue";
});


let bottom = 110
function jump() {
    let timerUp = setInterval(function() {
    if(bottom > 300) {
    clearInterval(timerUp)
    let timerDown = setInterval(function() {
        if(bottom < 110) {
            clearInterval(timerDown)
        }
        bottom -=5
        callChar.style.bottom = bottom + "px"
    },10)
    }
    bottom += 30
    callChar.style.bottom = bottom + "px"
    },20)
}


function control(e) {
    if(e.key === "ArrowUp") {
        jump()
        jumpAudio.play()
    }
}

document.addEventListener("keydown", control)

})
















