// ======================================
// ASTRONOT ADVENTURE
// ======================================


// ======================================
// ELEMENT
// ======================================

const startScreen =
    document.getElementById("startScreen");

const gameScreen =
    document.getElementById("gameScreen");

const gameOverScreen =
    document.getElementById("gameOverScreen");


const astronaut =
    document.getElementById("astronaut");

const gameArea =
    document.getElementById("gameArea");


const scoreText =
    document.getElementById("score");

const levelText =
    document.getElementById("level");

const livesText =
    document.getElementById("lives");


const leftButton =
    document.getElementById("leftButton");

const rightButton =
    document.getElementById("rightButton");


const finalScore =
    document.getElementById("finalScore");

const finalLevel =
    document.getElementById("finalLevel");

const finalStars =
    document.getElementById("finalStars");


// ======================================
// DATA GAME
// ======================================

let score = 0;

let level = 1;

let lives = 5;

let starsCollected = 0;

let astronautX = 50;

let gameRunning = false;


// ======================================
// MULAI GAME
// ======================================

function startGame() {

    startScreen.classList.add("hidden");

    gameOverScreen.classList.add("hidden");

    gameScreen.classList.remove("hidden");


    // Reset data

    score = 0;

    level = 1;

    lives = 5;

    starsCollected = 0;

    astronautX = 50;

    gameRunning = true;


    // Update tampilan

    scoreText.innerText = score;

    levelText.innerText = level;

    livesText.innerText = lives;

    astronaut.style.left =
        astronautX + "%";


    // Bersihkan object lama

    document
        .querySelectorAll(".star, .meteor")
        .forEach(function(object) {

            object.remove();

        });

}


// ======================================
// GERAK KIRI
// ======================================

function moveLeft() {

    if (!gameRunning) return;

    astronautX -= 6;

    if (astronautX < 5) {

        astronautX = 5;

    }

    astronaut.style.left =
        astronautX + "%";
}


// ======================================
// GERAK KANAN
// ======================================

function moveRight() {

    if (!gameRunning) return;

    astronautX += 6;

    if (astronautX > 95) {

        astronautX = 95;

    }

    astronaut.style.left =
        astronautX + "%";
}


// ======================================
// TOMBOL
// ======================================

leftButton.addEventListener(
    "click",
    moveLeft
);


rightButton.addEventListener(
    "click",
    moveRight
);


// ======================================
// KEYBOARD
// ======================================

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "ArrowLeft") {

            moveLeft();

        }

        if (event.key === "ArrowRight") {

            moveRight();

        }

    }
);


// ======================================
// BINTANG
// ======================================

function createStar() {

    if (!gameRunning) return;


    const star =
        document.createElement("div");


    star.className = "star";

    star.innerHTML = "⭐";


    star.style.left =
        Math.random() * 90 + "%";

    star.style.top =
        "-40px";


    gameArea.appendChild(star);


    let position = -40;


    const speed =
        2.5 + (level * 0.5);


    const fall =
        setInterval(
            function() {


                if (!gameRunning) {

                    clearInterval(fall);

                    star.remove();

                    return;

                }


                position += speed;

                star.style.top =
                    position + "px";


                const starX =
                    star.offsetLeft;

                const starY =
                    star.offsetTop;


                const astronautXPosition =
                    astronaut.offsetLeft;

                const astronautYPosition =
                    astronaut.offsetTop;


                // BINTANG TERTANGKAP

                if (

                    Math.abs(
                        starX -
                        astronautXPosition
                    ) < 50

                    &&

                    Math.abs(
                        starY -
                        astronautYPosition
                    ) < 50

                ) {


                    starsCollected++;


                    score += 10;


                    scoreText.innerText =
                        score;


                    // Naik level setiap 5 bintang

                    if (
                        starsCollected % 5 === 0
                    ) {

                        level++;

                        levelText.innerText =
                            level;

                    }


                    star.remove();

                    clearInterval(fall);

                }


                if (
                    position >
                    gameArea.offsetHeight
                ) {

                    star.remove();

                    clearInterval(fall);

                }


            },
            30
        );

}


// ======================================
// METEOR
// ======================================

function createMeteor() {

    if (!gameRunning) return;


    const meteor =
        document.createElement("div");


    meteor.className = "meteor";

    meteor.innerHTML = "☄️";


    meteor.style.left =
        Math.random() * 90 + "%";

    meteor.style.top =
        "-40px";


    gameArea.appendChild(meteor);


    let position = -40;


    const speed =
        2 + (level * 0.7);


    let alreadyHit = false;


    const fall =
        setInterval(
            function() {


                if (!gameRunning) {

                    clearInterval(fall);

                    meteor.remove();

                    return;

                }


                position += speed;

                meteor.style.top =
                    position + "px";


                const meteorX =
                    meteor.offsetLeft;

                const meteorY =
                    meteor.offsetTop;


                const astronautXPosition =
                    astronaut.offsetLeft;

                const astronautYPosition =
                    astronaut.offsetTop;


                // METEOR MENABRAK

                if (

                    !alreadyHit

                    &&

                    Math.abs(
                        meteorX -
                        astronautXPosition
                    ) < 45

                    &&

                    Math.abs(
                        meteorY -
                        astronautYPosition
                    ) < 45

                ) {


                    alreadyHit = true;


                    lives--;


                    livesText.innerText =
                        lives;


                    meteor.remove();

                    clearInterval(fall);


                    if (lives <= 0) {

                        gameOver();

                    }


                    return;

                }


                if (
                    position >
                    gameArea.offsetHeight
                ) {

                    meteor.remove();

                    clearInterval(fall);

                }


            },
            30
        );

}


// ======================================
// GAME OVER
// ======================================

function gameOver() {

    gameRunning = false;


    // Tampilkan hasil

    finalScore.innerText =
        score;

    finalLevel.innerText =
        level;

    finalStars.innerText =
        starsCollected;


    // Tunggu sebentar

    setTimeout(
        function() {

            gameScreen.classList.add(
                "hidden"
            );

            gameOverScreen.classList.remove(
                "hidden"
            );

        },
        500
    );

}


// ======================================
// MAIN LAGI
// ======================================

function restartGame() {

    startGame();

}


// ======================================
// BINTANG MUNCUL
// ======================================

setInterval(
    function() {

        createStar();

    },
    1000
);


// ======================================
// METEOR MUNCUL
// ======================================

setInterval(
    function() {

        createMeteor();

    },
    2200
);
