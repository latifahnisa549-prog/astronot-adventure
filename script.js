const astronaut = document.getElementById("astronaut");
const gameArea = document.getElementById("gameArea");

const scoreText = document.getElementById("score");
const levelText = document.getElementById("level");
const livesText = document.getElementById("lives");

const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");

let score = 0;
let level = 1;
let lives = 3;

let astronautX = 50;
let gameRunning = true;


// =========================
// GERAK KE KIRI
// =========================

function moveLeft() {

    if (!gameRunning) return;

    astronautX = astronautX - 5;

    if (astronautX < 5) {
        astronautX = 5;
    }

    astronaut.style.left = astronautX + "%";
}


// =========================
// GERAK KE KANAN
// =========================

function moveRight() {

    if (!gameRunning) return;

    astronautX = astronautX + 5;

    if (astronautX > 95) {
        astronautX = 95;
    }

    astronaut.style.left = astronautX + "%";
}


// =========================
// TOMBOL KIRI
// =========================

leftButton.onclick = function() {
    moveLeft();
};


// =========================
// TOMBOL KANAN
// =========================

rightButton.onclick = function() {
    moveRight();
};


// =========================
// KEYBOARD
// =========================

document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowLeft") {
        moveLeft();
    }

    if (event.key === "ArrowRight") {
        moveRight();
    }

});


// =========================
// MEMBUAT BINTANG
// =========================

function createStar() {

    if (!gameRunning) return;

    const star = document.createElement("div");

    star.className = "star";
    star.innerHTML = "⭐";

    star.style.left = Math.random() * 90 + "%";
    star.style.top = "-40px";

    gameArea.appendChild(star);

    let position = -40;

    const fall = setInterval(function() {

        if (!gameRunning) {
            clearInterval(fall);
            star.remove();
            return;
        }

        position += 4 + level;

        star.style.top = position + "px";

        const starX = star.offsetLeft;
        const starY = star.offsetTop;

        const astronautX = astronaut.offsetLeft;
        const astronautY = astronaut.offsetTop;

        if (
            Math.abs(starX - astronautX) < 55 &&
            Math.abs(starY - astronautY) < 55
        ) {

            score++;

            scoreText.innerText = score;

            if (score % 5 === 0) {

                level++;

                levelText.innerText = level;

                alert(
                    "🎉 LEVEL " + level + "!"
                );
            }

            star.remove();
            clearInterval(fall);
        }

        if (position > gameArea.offsetHeight) {

            star.remove();
            clearInterval(fall);
        }

    }, 30);
}


// =========================
// MEMBUAT METEOR
// =========================

function createMeteor() {

    if (!gameRunning) return;

    const meteor = document.createElement("div");

    meteor.className = "meteor";
    meteor.innerHTML = "☄️";

    meteor.style.left = Math.random() * 90 + "%";
    meteor.style.top = "-40px";

    gameArea.appendChild(meteor);

    let position = -40;

    const fall = setInterval(function() {

        if (!gameRunning) {
            clearInterval(fall);
            meteor.remove();
            return;
        }

        position += 5 + level;

        meteor.style.top = position + "px";

        const meteorX = meteor.offsetLeft;
        const meteorY = meteor.offsetTop;

        const astronautX = astronaut.offsetLeft;
        const astronautY = astronaut.offsetTop;

        if (
            Math.abs(meteorX - astronautX) < 55 &&
            Math.abs(meteorY - astronautY) < 55
        ) {

            lives--;

            livesText.innerText = lives;

            meteor.remove();
            clearInterval(fall);

            if (lives <= 0) {
                gameOver();
            }
        }

        if (position > gameArea.offsetHeight) {

            meteor.remove();
            clearInterval(fall);
        }

    }, 30);
}


// =========================
// GAME OVER
// =========================

function gameOver() {

    gameRunning = false;

    alert(
        "💥 GAME OVER 💥\n\n" +
        "⭐ Skor: " + score + "\n" +
        "🎯 Level: " + level
    );
}


// =========================
// MULAI LAGI
// =========================

function restartGame() {
    location.reload();
}


// =========================
// JALANKAN GAME
// =========================

setInterval(createStar, 1000);

setInterval(createMeteor, 1500);
