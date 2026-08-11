// ============================================
// ASTRONOT ADVENTURE
// ============================================


// ============================================
// ELEMENT HTML
// ============================================

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


// ============================================
// DATA GAME
// ============================================

let score = 0;

let level = 1;

let lives = 5;

let starsCollected = 0;

let astronautX = 50;

let gameRunning = true;


// ============================================
// DATA AWAL
// ============================================

scoreText.innerText = score;

levelText.innerText = level;

livesText.innerText = lives;


// ============================================
// GERAK ASTRONOT
// ============================================

function moveLeft() {

    if (!gameRunning) return;

    astronautX -= 6;

    if (astronautX < 5) {

        astronautX = 5;

    }

    astronaut.style.left =
        astronautX + "%";
}


function moveRight() {

    if (!gameRunning) return;

    astronautX += 6;

    if (astronautX > 95) {

        astronautX = 95;

    }

    astronaut.style.left =
        astronautX + "%";
}


// ============================================
// TOMBOL KIRI
// ============================================

leftButton.addEventListener(
    "click",
    function() {

        moveLeft();

    }
);


// ============================================
// TOMBOL KANAN
// ============================================

rightButton.addEventListener(
    "click",
    function() {

        moveRight();

    }
);


// ============================================
// KEYBOARD
// ============================================

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


// ============================================
// MEMBUAT BINTANG
// ============================================

function createStar() {

    if (!gameRunning) return;


    const star =
        document.createElement("div");


    star.className = "star";

    star.innerHTML = "⭐";


    // Posisi acak

    star.style.left =
        Math.random() * 90 + "%";

    star.style.top =
        "-40px";


    gameArea.appendChild(star);


    let position = -40;


    // Kecepatan bintang

    const speed =
        2.5 + (level * 0.5);


    const fall =
        setInterval(
            function() {


                // Jika game selesai

                if (!gameRunning) {

                    clearInterval(fall);

                    star.remove();

                    return;

                }


                // Bintang bergerak turun

                position += speed;

                star.style.top =
                    position + "px";


                // Posisi bintang

                const starX =
                    star.offsetLeft;

                const starY =
                    star.offsetTop;


                // Posisi astronot

                const astronautXPosition =
                    astronaut.offsetLeft;

                const astronautYPosition =
                    astronaut.offsetTop;


                // ====================================
                // BINTANG TERTANGKAP
                // ====================================

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


                    // Tambah bintang

                    starsCollected++;


                    // Setiap bintang = 10 skor

                    score += 10;


                    scoreText.innerText =
                        score;


                    // ====================================
                    // NAIK LEVEL SETIAP 5 BINTANG
                    // ====================================

                    if (
                        starsCollected % 5 === 0
                    ) {

                        level++;

                        levelText.innerText =
                            level;


                        showLevelMessage();

                    }


                    // Hapus bintang

                    star.remove();

                    clearInterval(fall);

                }


                // ====================================
                // BINTANG KELUAR LAYAR
                // ====================================

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


// ============================================
// MEMBUAT METEOR
// ============================================

function createMeteor() {

    if (!gameRunning) return;


    const meteor =
        document.createElement("div");


    meteor.className = "meteor";

    meteor.innerHTML = "☄️";


    // Posisi acak

    meteor.style.left =
        Math.random() * 90 + "%";

    meteor.style.top =
        "-40px";


    gameArea.appendChild(meteor);


    let position = -40;


    // Meteor tidak terlalu cepat

    const speed =
        2 + (level * 0.7);


    // ==========================================
    // PENANDA METEOR SUDAH MENABRAK ATAU BELUM
    // ==========================================

    let alreadyHit = false;


    const fall =
        setInterval(
            function() {


                // Jika game selesai

                if (!gameRunning) {

                    clearInterval(fall);

                    meteor.remove();

                    return;

                }


                // Meteor bergerak

                position += speed;

                meteor.style.top =
                    position + "px";


                // Posisi meteor

                const meteorX =
                    meteor.offsetLeft;

                const meteorY =
                    meteor.offsetTop;


                // Posisi astronot

                const astronautXPosition =
                    astronaut.offsetLeft;

                const astronautYPosition =
                    astronaut.offsetTop;


                // ==========================================
                // METEOR MENABRAK ASTRONOT
                // ==========================================

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


                    // Tandai meteor sudah mengenai astronot

                    alreadyHit = true;


                    // Kurangi 1 nyawa

                    lives--;


                    // Update tampilan nyawa

                    livesText.innerText =
                        lives;


                    // Hapus meteor

                    meteor.remove();


                    // Hentikan meteor

                    clearInterval(fall);


                    // ====================================
                    // GAME OVER JIKA NYAWA 0
                    // ====================================

                    if (lives <= 0) {

                        gameOver();

                    }


                    return;

                }


                // ==========================================
                // METEOR KELUAR LAYAR
                // ==========================================

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


// ============================================
// PESAN LEVEL
// ============================================

function showLevelMessage() {

    alert(

        "🎉 LEVEL " +
        level +
        "!\n\n" +

        "⭐ Kamu sudah mengumpulkan " +
        starsCollected +
        " bintang!\n\n" +

        "☄️ Meteor akan menjadi lebih cepat!"

    );

}


// ============================================
// GAME OVER
// ============================================

function gameOver() {

    // Hentikan game

    gameRunning = false;


    // Tunggu sebentar

    setTimeout(
        function() {


            alert(

                "💥 GAME OVER 💥\n\n" +

                "🏆 SKOR AKHIR\n" +
                score +

                "\n\n" +

                "🎯 LEVEL AKHIR\n" +
                level +

                "\n\n" +

                "⭐ BINTANG TERKUMPUL\n" +
                starsCollected

            );


        },
        200
    );

}


// ============================================
// RESTART GAME
// ============================================

function restartGame() {

    location.reload();

}


// ============================================
// BINTANG MUNCUL
// ============================================

// Setiap 1 detik

setInterval(
    function() {

        createStar();

    },
    1000
);


// ============================================
// METEOR MUNCUL
// ============================================

// Setiap 2,2 detik

setInterval(
    function() {

        createMeteor();

    },
    2200
);
