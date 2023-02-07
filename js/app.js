document.addEventListener("DOMContentLoaded", () => {
let callChar = document.getElementById("char");
let button1 = document.querySelector('.start');
let button2 = document.querySelector('.htp');
let button3 = document.querySelector('.restart');
let callGame = document.getElementById("game");
let gameOverPic = document.querySelector(".gameOver");
let winPic= document.querySelector(".youWin");
let jumpAudio = document.getElementById("jump audio");
let shootAudio = document.getElementById("shoot");
let winAudio = document.getElementById("win sound");
let nameOfTheGame = document.getElementById("gameName")
let gameOverAudio = document.getElementById("game over")
let scoreShow = document.querySelector(".score")
let ufoShow = document.querySelector(".ufoShot")
let howToPlay = document.querySelector("#htp")
let backButton = document.querySelector(".back")

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
    ufoShow.style.display = "block";
    createUfo();
    moveUfo();
    gameOver();
    runningScore();
    win();
});
button2.addEventListener("click", (e) => {
    e.preventDefault();
    button1.remove();
    button2.remove();
    nameOfTheGame.remove()
    howToPlay.style.display = "block"
    backButton.style.display = "block"
});

backButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.reload()
});

function jump() {
    charBottom = parseInt(window.getComputedStyle(callChar).getPropertyValue("bottom"));
    let timerUp = setInterval(function() {
    if(charBottom > 300) {
    clearInterval(timerUp)
    let timerDown = setInterval(function() {
        if(charBottom < 110) {
            clearInterval(timerDown)
        }     
        charBottom -=5
        callChar.style.bottom = charBottom + "px"
    },10)
    }
    charBottom += 30
    callChar.style.bottom = charBottom + "px"
    },20)
}

function control(e) {
    if(e.key === "ArrowUp") {
        jump()
        jumpAudio.play()
        jumpingScore()
    }
    if (e.key === (" ")) {
        createBullet()
        shootAudio.play()
    }
}

document.addEventListener("keydown", control)

let ufoDie = 0;
let score = 0
function runningScore() {
    let scoreId = setInterval(() => {
    score++     
    document.querySelector("#score").innerHTML = score;
    if (isGameOver === true || isWin === true) {
    clearInterval (scoreId)}
        },300)
    }

function jumpingScore() {
    score += 50
    document.querySelector("#score").innerHTML = score;
}

function shootingScore() {
    if (!isGameOver && !isWin) {
      ufoDie++;
      score += 250;
      document.querySelector("#score").innerHTML = score;
      document.querySelector("#ufoShot").innerHTML = ufoDie;
    }
  }
  

    const ufoImages = ["pics/ufo1.png", "pics/ufo2.png", "pics/ufo3.png"]

    function createUfo() {
        let createUfos = setInterval(() => {
        let newUfo = document.createElement("img")
        let ufoSpriteImage = ufoImages[Math.floor(Math.random() * ufoImages.length)]
        newUfo.src = ufoSpriteImage
        newUfo.classList.add("ufo")
        newUfo.style.left = "1000px"
        newUfo.style.bottom = `${Math.floor(Math.random() * 200) + 130}px`
        callGame.appendChild(newUfo)
        moveUfo(newUfo)
        if (isGameOver === true || isWin === true) {
            clearInterval(createUfos)
        }
    },7000)
    }
    

    function moveUfo(ufo) {
        if (!(ufo instanceof Element)) {
            return;
        }
        let moveUfoInterval = setInterval(() => {
            let xPosition = parseInt(window.getComputedStyle(ufo).getPropertyValue("left"))
            if(xPosition <= -10) {
                ufo.remove()
            } else {
                ufo.style.left = `${xPosition - 10}px`
            }
        },50)
    }


    function createBullet() {
        let bullet = createBulletElement()
        callGame.appendChild(bullet)
        moveBullet(bullet)
    }

    function createBulletElement() {
        let xPosition = parseInt(window.getComputedStyle(callChar).getPropertyValue("left"))
        let yPosition = parseInt(window.getComputedStyle(callChar).getPropertyValue("top"))
        let newBullet = document.createElement("img")
        newBullet.src = "pics/bullet.png"
        newBullet.classList.add("bullet")
        newBullet.style.left = `${xPosition}px`
        newBullet.style.top = `${yPosition + 50}px`
        return newBullet
    }

    function moveBullet(bullet) {
        let bulletInterval = setInterval(() => {
            let xPosition = parseInt(bullet.style.left)
            let ufos = document.getElementsByClassName("ufo")

        for(let i = 0; i < ufos.length; i++) {
        let ufo = ufos[i] 

        let ufoBound = ufo.getBoundingClientRect()
        let bulletBound = bullet.getBoundingClientRect()
        

        if(bulletBound.left >= ufoBound.left && 
        bulletBound.bottom <= ufoBound.bottom && 
        bulletBound.right <= ufoBound.right && 
        bulletBound.top <= ufoBound.top) {
        ufo.parentElement.removeChild(ufo),
        shootingScore();
    }}
        if (xPosition >= 1000) {
            bullet.remove(),
            clearInterval(bulletInterval)
        } else {
            bullet.style.left = `${xPosition + 10}px`
        }
    }, 10)
} 

let isWin = false;
function win() {
    setInterval(function () {
    if (isGameOver === false && ufoDie === 10 || isGameOver === false && score >= 3000)
    winPic.style.display = "block",
    callGame.style.display = "none",
    nameOfTheGame.style.display = "none",
    scoreShow.style.fontSize = "80px",
    scoreShow.style.position = "relative",
    scoreShow.style.textAlign = "center",
    ufoShow.style.fontSize = "80px",
    ufoShow.style.margin = "150px auto",
    ufoShow.style.position = "relative",
    ufoShow.style.textAlign = "center",
    button3.style.display = "block",
    isWin = true,
    winAudio.play()},10);
}

    let isGameOver = false;
    function gameOver() {
    let callRock = document.getElementById("rock");

      setInterval(function () {
        let charTop = parseInt(window.getComputedStyle(callChar).getPropertyValue("top"));
        let rockLeft = parseInt(window.getComputedStyle(callRock).getPropertyValue("left"));

      if(isWin === false && rockLeft < 190 && rockLeft > 10 && charTop >= 350)
        gameOverPic.style.display = "block",
        callGame.style.display = "none",
        nameOfTheGame.style.display = "none",
        scoreShow.style.fontSize = "80px",
        scoreShow.style.position = "relative",
        scoreShow.style.textAlign = "center",
        ufoShow.style.fontSize = "80px",
        ufoShow.style.margin = "150px auto",
        ufoShow.style.position = "relative",
        ufoShow.style.textAlign = "center",
        button3.style.display = "block",
        isGameOver = true,
        gameOverAudio.play()
        },10);
      }
    
    
    button3.addEventListener("click",function restart() {
        window.location.reload()
    })
})
















