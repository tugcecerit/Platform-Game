document.addEventListener("DOMContentLoaded", () => {
let callChar = document.getElementById("char");
let button1 = document.querySelector('.start');
let button2 = document.querySelector('.htp');
let callGame = document.getElementById("game");
let gameOverPic = document.querySelector(".gameOver");
let jumpAudio = document.getElementById("jump audio");
let nameOfTheGame = document.getElementById("gameName")
let gameOverAudio = document.getElementById("game over")
let scoreShow = document.querySelector(".score")

button1.addEventListener("click", (e) => {
    e.preventDefault();
    button1.remove();
    button2.remove();
    callGame.style.display = "block";
    nameOfTheGame.style.fontSize = "80px"
    document.body.style.background = "none";
    gameOverPic.style.display = "none";
    document.body.style.backgroundColor = "black";
    scoreShow.style.display = "block";
    gameOver();
    runningScore();
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
        jumpingScore()
    }
}

document.addEventListener("keydown", control)

let score = 0
function runningScore() {
    let scoreId = setInterval(() => {
    score++     
    document.querySelector("#score").innerHTML = score;
    if (isGameOver === true) {
    clearInterval (scoreId)}
        },300)
    }

function jumpingScore() {
    score += 50
    document.querySelector("#score").innerHTML = score;
}

let isGameOver = false;
function gameOver() {

    let callRock = document.getElementById("rock");
    let callUfo1 = document.getElementById("ufo1");
    let callUfo2 = document.getElementById("ufo1");
    let callUfo3 = document.getElementById("ufo1");
    let callUfo4 = document.getElementById("ufo1");
    
      setInterval(function () {
          let charTop = parseInt(window.getComputedStyle(callChar).getPropertyValue("top"));
          let rockLeft = parseInt(window.getComputedStyle(callRock).getPropertyValue("left"));
          let ufo1Left = parseInt(window.getComputedStyle(callUfo1).getPropertyValue("left"));
          let ufo2Left = parseInt(window.getComputedStyle(callUfo2).getPropertyValue("left"));
          let ufo3Left = parseInt(window.getComputedStyle(callUfo3).getPropertyValue("left"));
          let ufo4Left = parseInt(window.getComputedStyle(callUfo4).getPropertyValue("left"));
      
      if(rockLeft < 190 && rockLeft > 10 && charTop >= 350 || ufo1Left < 150 && ufo1Left > 10 && charTop > 100 || ufo2Left < 150 && ufo2Left > 10 && charTop > 100 || ufo3Left < 150 && ufo3Left > 10 && charTop > 100 || ufo4Left < 150 && ufo4Left > 10 && charTop > 100)
        gameOverPic.style.display = "block",
        gameOverPic.style.textAlign = "center",
        callGame.style.display = "none",
        nameOfTheGame.style.display = "none",
        scoreShow.style.fontSize = "80px",
        scoreShow.style.position = "relative",
        scoreShow.style.textAlign = "center",
        isGameOver = true,
        gameOverAudio.play()
      },10);
    }
    
})
















