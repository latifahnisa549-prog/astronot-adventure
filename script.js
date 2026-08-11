// ==========================================
// ASTRONOT ADVENTURE
// ==========================================

// DATA GAME
let score = 0;
let level = 1;
let lives = 5;
let starsCollected = 0;

let astronautX = 50;
let gameRunning = false;


// ==========================================
// ELEMENT HTML
// ==========================================

const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const gameOverScreen = document.getElementById("gameOverScreen");

const astronaut = document.getElementById("astronaut");
const gameArea = document.getElementById("gameArea");

const scoreText = document.getElementById("score");
const levelText = document.getElementById("level");
const livesText = document.getElementById("lives");

const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");

const finalScore = document.getElementById("finalScore");
const finalLevel = document.getElementById("finalLevel");
const finalStars = document.getElementById("finalStars");


// ==========================================
// MULAI GAME
// ==========================================

function startGame() {

    console.log("Game dimulai!");

    // Sembunyikan menu awal
    startScreen.classList.add("hidden");

    // Tampilkan game
    gameScreen.classList.remove("hidden");

    // Sembunyikan game over
    gameOverScreen.classList.add("hidden");


    // Reset semua data
    score = 0;
    level = 1;
    lives = 5;
    starsCollected = 0;
    astronautX = 50;

    gameRunning = true;


    // Update tampilan
    scoreText.textContent = score;
    levelText.textContent = level;
    livesText.textContent = lives;


    // Posisi awal astronot
    astronaut.style.left = "50%";


    // Bersihkan bintang dan meteor lama
    document
        .querySelectorAll(".star, .meteor")
        .forEach(function(object) {
            object.remove();
        });
}


// ==========================================
// GERAK KIRI
// ==========================================

function moveLeft() {

    if (!gameRunning) {
        return;
    }

    astronautX -= 6;

    if (astronautX < 5) {
        astronautX = 5;
    }

    astronaut.style.left = astronautX + "%";
}


// ==========================================
// GERAK KANAN
// ==========================================

function moveRight() {

    if (!gameRunning) {
        return;
    }

    astronautX += 6;

    if (astronautX > 95) {
        astronautX = 95;
    }

    astronaut.style.left = astronautX + "%";
}


// ==========================================
// TOMBOL KIRI
// ==========================================

leftButton.addEventListener("click", function() {
    moveLeft();
});


// ==========================================
// TOMBOL KANAN
// ==========================================

rightButton.addEventListener("click", function() {
    moveRight();
});


// ==========================================
// KEYBOARD
// ==========================================

document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowLeft") {
        moveLeft();
    }

    if (event.key === "ArrowRight") {
        moveRight();
    }

});


// ==========================================
// MEMBUAT BINTANG
// ==========================================

function createStar() {

    if (!gameRunning) {
        return;
    }


    const star = document.createElement("div");

    star.className = "star";

    star.textContent = "⭐";


    // Posisi acak
    star.style.left = Math.random() * 90 + "%";

    star.style.top = "-40px";


    gameArea.appendChild(star);


    let position = -40;


    const speed = 2.5 + (level * 0.5);


    const timer = setInterval(function() {

        if (!gameRunning) {

            clearInterval(timer);

            star.remove();

            return;
        }


        // Bintang turun
        position += speed;

        star.style.top = position + "px";


        // Posisi bintang
        const starX = star.offsetLeft;
        const starY = star.offsetTop;


        // Posisi astronot
        const astronautXPos = astronaut.offsetLeft;
        const astronautYPos = astronaut.offsetTop;


        // ======================================
        // BINTANG TERTANGKAP
        // ======================================

        if (
            Math.abs(starX - astronautXPos) < 55 &&
            Math.abs(starY - astronautYPos) < 55
        ) {

            // Tambah jumlah bintang
            starsCollected++;


            // Tambah skor
            score += 10;


            // Update skor
            scoreText.textContent = score;


            // ==================================
            // LEVEL NAIK
            // ==================================

            if (starsCollected % 5 === 0) {

                level++;

                levelText.textContent = level;

            }


            star.remove();

            clearInterval(timer);

            return;
        }


        // ======================================
        // BINTANG KELUAR LAYAR
        // ======================================

        if (position > gameArea.offsetHeight) {

            star.remove();

            clearInterval(timer);

        }

    }, 30);
}


// ==========================================
// MEMBUAT METEOR
// ==========================================

function createMeteor() {

    if (!gameRunning) {
        return;
    }


    const meteor = document.createElement("div");

    meteor.className = "meteor";

    meteor.textContent = "☄️";


    // Posisi acak
    meteor.style.left = Math.random() * 90 + "%";

    meteor.style.top = "-40px";


    gameArea.appendChild(meteor);


    let position = -40;


    const speed = 2 + (level * 0.5);


    // Supaya satu meteor hanya
    // mengurangi satu nyawa
    let alreadyHit = false;


    const timer = setInterval(function() {

        if (!gameRunning) {

            clearInterval(timer);

            meteor.remove();

            return;
        }


        // Meteor turun
        position += speed;

        meteor.style.top = position + "px";


        // Posisi meteor
        const meteorX = meteor.offsetLeft;
        const meteorY = meteor.offsetTop;


        // Posisi astronot
        const astronautXPos = astronaut.offsetLeft;
        const astronautYPos = astronaut.offsetTop;


        // ======================================
        // METEOR MENABRAK ASTRONOT
        // ======================================

        if (
            !alreadyHit &&
            Math.abs(meteorX - astronautXPos) < 50 &&
            Math.abs(meteorY - astronautYPos) < 50
        ) {

            alreadyHit = true;


            // Kurangi nyawa
            lives--;


            // Update tampilan
            livesText.textContent = lives;


            // Hapus meteor
            meteor.remove();

            clearInterval(timer);


            // ==================================
            // GAME OVER
            // ==================================

            if (lives <= 0) {

                gameOver();

            }

            return;
        }


        // ======================================
        // METEOR KELUAR LAYAR
        // ======================================

        if (position > gameArea.offsetHeight) {

            meteor.remove();

            clearInterval(timer);

        }

    }, 30);
}


// ==========================================
// GAME OVER
// ==========================================

function gameOver() {

    gameRunning = false;


    // Tampilkan hasil
    finalScore.textContent = score;

    finalLevel.textContent = level;

    finalStars.textContent = starsCollected;


    // Tunggu sedikit
    setTimeout(function() {

        gameScreen.classList.add("hidden");

        gameOverScreen.classList.remove("hidden");

    }, 500);
}


// ==========================================
// MAIN LAGI
// ==========================================

function restartGame() {

    startGame();
}


// ==========================================
// TIMER BINTANG
// ==========================================

setInterval(function() {

    createStar();

}, 1000);


// ==========================================
// TIMER METEOR
// ==========================================

setInterval(function() {

    createMeteor();

}, 2200);
