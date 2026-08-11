// ======================================
// MENGAMBIL ELEMENT DARI HTML
// ======================================

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


// ======================================
// DATA GAME
// ======================================

let score = 0;

let level = 1;

let lives = 5;

let starsCollected = 0;

let astronautX = 50;

let gameRunning = true;


// ======================================
// MENAMPILKAN DATA AWAL
// ======================================

scoreText.innerText = score;

levelText.innerText = level;

livesText.innerText = lives;


// ======================================
// GERAK KE KIRI
// ======================================

function moveLeft() {

    if (!gameRunning) return;

    astronautX -= 5;

    if (astronautX < 5) {

        astronautX = 5;

    }

    astronaut.style.left =
        astronautX + "%";
}


// ======================================
// GERAK KE KANAN
// ======================================

function moveRight() {

    if (!gameRunning) return;

    astronautX += 5;

    if (astronautX > 95) {

        astronautX = 95;

    }

    astronaut.style.left =
        astronautX + "%";
}


// ======================================
// TOMBOL KIRI
// ======================================

leftButton.onclick = function() {

    moveLeft();

};


// ======================================
// TOMBOL KANAN
// ======================================

rightButton.onclick = function() {

    moveRight();

};


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
// MEMBUAT BINTANG
// ======================================

function createStar() {

    if (!gameRunning) return;


    const star =
        document.createElement("div");


    star.className = "star";


    star.innerHTML = "⭐";


    // posisi awal bintang

    star.style.left =
        Math.random() * 90 + "%";


    star.style.top =
        "-40px";


    gameArea.appendChild(star);


    let position = -40;


    // kecepatan bintang

    const speed =
        3 + level;


    const fall =
        setInterval(function() {


            if (!gameRunning) {

                clearInterval(fall);

                star.remove();

                return;

            }


            position += speed;


            star.style.top =
                position + "px";


            // posisi bintang

            const starX =
                star.offsetLeft;

            const starY =
                star.offsetTop;


            // posisi astronot

            const astronautXPosition =
                astronaut.offsetLeft;

            const astronautYPosition =
                astronaut.offsetTop;


            // ==================================
            // BINTANG TERTANGKAP
            // ==================================

            if (

                Math.abs(
                    starX -
                    astronautXPosition
                ) < 60

                &&

                Math.abs(
                    starY -
                    astronautYPosition
                ) < 60

            ) {


                // tambah jumlah bintang

                starsCollected++;


                // setiap bintang = 10 skor

                score += 10;


                scoreText.innerText =
                    score;


                // ==================================
                // NAIK LEVEL
                // SETIAP 5 BINTANG
                // ==================================

                if (
                    starsCollected % 5 === 0
                ) {

                    level++;

                    levelText.innerText =
                        level;


                    alert(
                        "🎉 LEVEL " +
                        level +
                        "!\n\n" +
                        "⭐ Bintang terkumpul: " +
                        starsCollected
                    );

                }


                star.remove();

                clearInterval(fall);

            }


            // ==================================
            // BINTANG KELUAR DARI LAYAR
            // ==================================

            if (
                position >
                gameArea.offsetHeight
            ) {

                star.remove();

                clearInterval(fall);

            }


        }, 30);

}


// ======================================
// MEMBUAT METEOR
// ======================================

function createMeteor() {

    if (!gameRunning) return;


    const meteor =
        document.createElement("div");


    meteor.className = "meteor";


    meteor.innerHTML = "☄️";


    // posisi meteor

    meteor.style.left =
        Math.random() * 90 + "%";


    meteor.style.top =
        "-40px";


    gameArea.appendChild(meteor);


    let position = -40;


    // meteor semakin cepat
    // jika level semakin tinggi

    const speed =
        4 + level;


    const fall =
        setInterval(function() {


            if (!gameRunning) {

                clearInterval(fall);

                meteor.remove();

                return;

            }


            position += speed;


            meteor.style.top =
                position + "px";


            // posisi meteor

            const meteorX =
                meteor.offsetLeft;

            const meteorY =
                meteor.offsetTop;


            // posisi astronot

            const astronautXPosition =
                astronaut.offsetLeft;

            const astronautYPosition =
                astronaut.offsetTop;


            // ==================================
            // ASTRONOT TERKENA METEOR
            // ==================================

            if (

                Math.abs(
                    meteorX -
                    astronautXPosition
                ) < 60

                &&

                Math.abs(
                    meteorY -
                    astronautYPosition
                ) < 60

            ) {


                // NYAWA BERKURANG 1

                lives--;


                livesText.innerText =
                    lives;


                meteor.remove();

                clearInterval(fall);


                // ==================================
                // CEK GAME OVER
                // ==================================

                if (lives <= 0) {

                    gameOver();

                }

            }


            // ==================================
            // METEOR KELUAR DARI LAYAR
            // ==================================

            if (
                position >
                gameArea.offsetHeight
            ) {

                meteor.remove();

                clearInterval(fall);

            }


        }, 30);

}


// ======================================
// GAME OVER
// ======================================

function gameOver() {

    gameRunning = false;


    // tunggu sebentar

    setTimeout(function() {


        alert(

            "💥 GAME OVER 💥\n\n" +

            "🏆 SKOR AKHIR: " +
            score +

            "\n\n" +

            "🎯 LEVEL: " +
            level +

            "\n\n" +

            "⭐ BINTANG: " +
            starsCollected

        );


    }, 200);

}


// ======================================
// MULAI ULANG
// ======================================

function restartGame() {

    location.reload();

}


// ======================================
// MEMUNCULKAN BINTANG
// ======================================

// setiap 1 detik

setInterval(function() {

    createStar();

}, 1000);


// ======================================
// MEMUNCULKAN METEOR
// ======================================

// setiap 1,5 detik

setInterval(function() {

    createMeteor();

}, 1500);
