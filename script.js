// ==========================================
// ASTRONOT ADVENTURE - VERSI ANTI LAG
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
// DATA GAME
// ==========================================

let score = 0;
let level = 1;
let lives = 5;
let starsCollected = 0;

let astronautX = 50;
let gameRunning = false;


// Semua object game disimpan di sini
let gameObjects = [];


// ==========================================
// MULAI GAME
// ==========================================

function startGame() {

    startScreen.classList.add("hidden");
    gameOverScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    score = 0;
    level = 1;
    lives = 5;
    starsCollected = 0;
    astronautX = 50;

    gameRunning = true;

    scoreText.textContent = score;
    levelText.textContent = level;
    livesText.textContent = lives;

    astronaut.style.left = "50%";

    clearObjects();
}


// ==========================================
// HAPUS OBJECT LAMA
// ==========================================

function clearObjects() {

    gameObjects.forEach(function(object) {

        if (object.element) {
            object.element.remove();
        }

    });

    gameObjects = [];
}


// ==========================================
// GERAK ASTRONOT
// ==========================================

function moveLeft() {

    if (!gameRunning) return;

    astronautX -= 7;

    if (astronautX < 5) {
        astronautX = 5;
    }

    astronaut.style.left = astronautX + "%";
}


function moveRight() {

    if (!gameRunning) return;

    astronautX += 7;

    if (astronautX > 95) {
        astronautX = 95;
    }

    astronaut.style.left = astronautX + "%";
}


// ==========================================
// TOMBOL
// ==========================================

leftButton.addEventListener("click", moveLeft);
rightButton.addEventListener("click", moveRight);


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
// BUAT BINTANG
// ==========================================

function createStar() {

    if (!gameRunning) return;

    // Batasi jumlah object
    if (gameObjects.length >= 15) return;

    const star = document.createElement("div");

    star.className = "star";
    star.textContent = "⭐";

    const x = Math.random() * 90;

    star.style.left = x + "%";
    star.style.top = "-40px";

    gameArea.appendChild(star);

    gameObjects.push({

        element: star,
        type: "star",
        x: x,
        y: -40,
        speed: 2.5 + level * 0.3

    });
}


// ==========================================
// BUAT METEOR
// ==========================================

function createMeteor() {

    if (!gameRunning) return;

    // Batasi jumlah object
    if (gameObjects.length >= 15) return;

    const meteor = document.createElement("div");

    meteor.className = "meteor";
    meteor.textContent = "☄️";

    const x = Math.random() * 90;

    meteor.style.left = x + "%";
    meteor.style.top = "-40px";

    gameArea.appendChild(meteor);

    gameObjects.push({

        element: meteor,
        type: "meteor",
        x: x,
        y: -40,
        speed: 2 + level * 0.35,
        hit: false

    });
}


// ==========================================
// UPDATE GAME
// ==========================================

function updateGame() {

    if (!gameRunning) return;

    const astronautXPos = astronaut.offsetLeft;
    const astronautYPos = astronaut.offsetTop;

    for (let i = gameObjects.length - 1; i >= 0; i--) {

        const object = gameObjects[i];

        object.y += object.speed;

        object.element.style.top =
            object.y + "px";


        const objectX =
            object.element.offsetLeft;

        const objectY =
            object.element.offsetTop;


        // ==================================
        // TABRAKAN
        // ==================================

        if (
            Math.abs(objectX - astronautXPos) < 50 &&
            Math.abs(objectY - astronautYPos) < 50
        ) {

            // BINTANG
            if (object.type === "star") {

                starsCollected++;

                score += 10;

                scoreText.textContent = score;


                // Naik level setiap 5 bintang
                if (starsCollected % 5 === 0) {

                    level++;

                    levelText.textContent = level;

                }

                removeObject(i);

                continue;
            }


            // METEOR
            if (
                object.type === "meteor" &&
                !object.hit
            ) {

                object.hit = true;

                lives--;

                livesText.textContent = lives;

                removeObject(i);


                if (lives <= 0) {

                    gameOver();

                    return;

                }

                continue;
            }
        }


        // ==================================
        // OBJECT KELUAR LAYAR
        // ==================================

        if (
            object.y >
            gameArea.offsetHeight + 50
        ) {

            removeObject(i);

        }

    }
}


// ==========================================
// HAPUS OBJECT
// ==========================================

function removeObject(index) {

    const object =
        gameObjects[index];

    if (object && object.element) {

        object.element.remove();

    }

    gameObjects.splice(index, 1);
}


// ==========================================
// GAME LOOP
// ==========================================

function gameLoop() {

    updateGame();

    requestAnimationFrame(gameLoop);
}


// ==========================================
// GAME OVER
// ==========================================

function gameOver() {

    gameRunning = false;

    finalScore.textContent = score;
    finalLevel.textContent = level;
    finalStars.textContent = starsCollected;

    clearObjects();

    setTimeout(function() {

        gameScreen.classList.add("hidden");

        gameOverScreen.classList.remove("hidden");

    }, 300);
}


// ==========================================
// MAIN LAGI
// ==========================================

function restartGame() {

    startGame();

}


// ==========================================
// SPAWN BINTANG
// ==========================================

setInterval(function() {

    if (gameRunning) {
        createStar();
    }

}, 1200);


// ==========================================
// SPAWN METEOR
// ==========================================

setInterval(function() {

    if (gameRunning) {
        createMeteor();
    }

}, 2500);


// ==========================================
// JALANKAN GAME LOOP
// ==========================================

gameLoop();
