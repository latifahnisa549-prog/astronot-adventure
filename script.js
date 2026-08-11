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


// =============================
// GERAK ASTRONOT
// =============================

function moveLeft() {

    if (!gameRunning) return;

    astronautX -= 6;

    if (astronautX < 5) {
        astronautX = 5;
    }

    astronaut.style.left = astronautX + "%";
}


function moveRight() {

    if (!gameRunning) return;

    astronautX += 6;

    if (astronautX > 95) {
        astronautX = 95;
    }

    astronaut.style.left = astronautX + "%";
}


// Keyboard
document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowLeft") {
        moveLeft();
    }

    if (event.key === "ArrowRight") {
        moveRight();
    }

});


// Tombol layar
leftButton.addEventListener("click", moveLeft);
rightButton.addEventListener("click", moveRight);


// =============================
// BINTANG
// =============================

function createStar() {

    if (!gameRunning) return;

    const star = document.createElement("div");

    star.className = "star";

    star.innerHTML = "⭐";

    star.style.left =
        Math.random() * 90 + "%";

    star.style.top = "-40px";

    gameArea.appendChild(star);

    let position = -40;

    const speed = 3 + level;

    const fall = setInterval(function() {

        if (!gameRunning) {

            clearInterval(fall);

            star.remove();

            return;
        }

        position += speed;

        star.style.top = position + "px";


        const starX = star.offsetLeft;
        const starY = star.offsetTop;

        const astronautX =
            astronaut.offsetLeft;

        const astronautY =
            astronaut.offsetTop;


        // Jika terkena astronot
        if (
            Math.abs(starX - astronautX) < 55 &&
            Math.abs(starY - astronautY) < 55
        ) {

            score++;

            scoreText.innerText = score;


            // Naik level setiap 5 skor
            if (score % 5 === 0) {

                level++;

                levelText.innerText = level;

                showLevelMessage();
            }


            star.remove();

            clearInterval(fall);
        }


        // Jika jatuh sampai bawah
        if (position > gameArea.offsetHeight) {

            star.remove();

            clearInterval(fall);
        }

    }, 30);
}


// =============================
// METEOR
// =============================

function createMeteor() {

    if (!gameRunning) return;

    const meteor = document.createElement("div");

    meteor.className = "meteor";

    meteor.innerHTML = "☄️";

    meteor.style.left =
        Math.random() * 90 + "%";

    meteor.style.top = "-40px";

    gameArea.appendChild(meteor);

    let position = -40;

    const speed = 4 + level;


    const fall = setInterval(function() {

        if (!gameRunning) {

            clearInterval(fall);

            meteor.remove();

            return;
        }


        position += speed;

        meteor.style.top = position + "px";


        const meteorX =
            meteor.offsetLeft;

        const meteorY =
            meteor.offsetTop;

        const astronautX =
            astronaut.offsetLeft;

        const astronautY =
            astronaut.offsetTop;


        // Astronot terkena meteor
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


// =============================
// PESAN LEVEL
// =============================

function showLevelMessage() {

    alert(
        "🎉 LEVEL " +
        level +
        "!\n\n" +
        "Meteor sekarang lebih cepat! ☄️"
    );
}


// =============================
// GAME OVER
// =============================

function gameOver() {

    gameRunning = false;

    setTimeout(function() {

        alert(
            "💥 GAME OVER 💥\n\n" +
            "⭐ Skor: " + score +
            "\n🎯 Level: " + level
        );

    }, 100);
}


// =============================
// RESTART
// =============================

function restartGame() {

    location.reload();
}


// =============================
// JALANKAN GAME
// =============================

// Bintang setiap 1 detik
setInterval(function() {

    createStar();

}, 1000);


// Meteor setiap 1,5 detik
setInterval(function() {

    createMeteor();

}, 1500);
