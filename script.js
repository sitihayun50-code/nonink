let score = 0;
let xp = 0;
let coins = 2450;
let level = 1;
let played = 24;
let streak = 7;

let autoPlaying = true;
let autoTimer;


/* ELEMENTS */

const scoreEl = document.getElementById("score");
const xpEl = document.getElementById("xp");
const coinsEl = document.getElementById("coins");
const levelEl = document.getElementById("level");
const playedEl = document.getElementById("played");
const streakEl = document.getElementById("streak");
const leaderXPEl = document.getElementById("leaderXP");

const player = document.querySelector(".player");
const gameStatus = document.getElementById("gameStatus");


/* AUTO PLAY */

function startAutoPlay() {

  if (autoPlaying) return;

  autoPlaying = true;

  player.classList.add("auto");

  gameStatus.textContent = "AUTO PLAY";

  showToast("▶ Auto Play aktif");

  autoTimer = setInterval(autoGame, 700);
}


/* STOP */

function stopAutoPlay() {

  autoPlaying = false;

  player.classList.remove("auto");

  gameStatus.textContent = "STOPPED";

  clearInterval(autoTimer);

  showToast("■ Auto Play dihentikan");
}


/* AUTO GAME */

function autoGame() {

  if (!autoPlaying) return;

  const gainedScore =
    Math.floor(Math.random() * 80) + 20;

  const gainedXP =
    Math.floor(Math.random() * 25) + 5;

  const gainedCoins =
    Math.floor(Math.random() * 30) + 5;

  score += gainedScore;
  xp += gainedXP;
  coins += gainedCoins;


  /* LEVEL */

  if (xp >= level * 100) {

    xp -= level * 100;

    level++;

    showToast(
      "🔥 LEVEL UP! Sekarang Level " + level
    );
  }


  /* UPDATE */

  scoreEl.textContent =
    score.toLocaleString("id-ID");

  xpEl.textContent =
    xp.toLocaleString("id-ID");

  coinsEl.textContent =
    coins.toLocaleString("id-ID");

  levelEl.textContent = level;


  /* LEADERBOARD */

  const leaderboardXP =
    8430 + score;

  leaderXPEl.textContent =
    leaderboardXP.toLocaleString("id-ID") + " XP";
}


/* MANUAL GAME */

function openGame(name) {

  played++;

  playedEl.textContent = played;

  showToast(
    "🎮 " + name + " dibuka!"
  );

  if (!autoPlaying) {

    startAutoPlay();

  }

}


/* TOAST */

function showToast(message) {

  const toast =
    document.getElementById("toast");

  const text =
    document.getElementById("toastText");

  text.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 2200);

}


/* MOBILE MENU */

function toggleMenu() {

  const menu =
    document.getElementById("mobileMenu");

  menu.classList.toggle("active");

}


/* START AUTO PLAY SAAT WEBSITE DIBUKA */

window.addEventListener("load", () => {

  player.classList.add("auto");

  autoTimer =
    setInterval(autoGame, 700);

});
