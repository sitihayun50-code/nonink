let score = 0;
let xp = 0;
let coins = 2450;
let level = 1;
let played = 24;
let streak = 7;

let autoPlaying = true;
let autoTimer;

let playerX = 50;
let playerY = 45;

let vipActive = true;
let currentSkin = "🚀";


const player = document.getElementById("player");
const scoreEl = document.getElementById("score");
const xpEl = document.getElementById("xp");
const coinsEl = document.getElementById("coins");
const levelEl = document.getElementById("level");
const playedEl = document.getElementById("played");
const leaderXPEl = document.getElementById("leaderXP");
const gameStatus = document.getElementById("gameStatus");

const joystickBase =
  document.getElementById("joystickBase");

const joystickStick =
  document.getElementById("joystickStick");


/* =========================
   AUTO PLAY
========================= */

function startAutoPlay() {

  if (autoPlaying) return;

  autoPlaying = true;

  player.classList.add("auto");

  gameStatus.textContent = "AUTO PLAY";

  showToast("▶ Auto Play aktif");

  autoTimer = setInterval(autoGame, 700);
}


function stopAutoPlay() {

  autoPlaying = false;

  player.classList.remove("auto");

  gameStatus.textContent = "MANUAL";

  clearInterval(autoTimer);

  showToast("🎮 Mode manual aktif");
}


function autoGame() {

  if (!autoPlaying) return;

  const addScore =
    Math.floor(Math.random() * 80) + 20;

  const addXP =
    Math.floor(Math.random() * 25) + 5;

  const addCoins =
    Math.floor(Math.random() * 30) + 5;

  score += addScore;
  xp += addXP;
  coins += addCoins;


  if (xp >= level * 100) {

    xp -= level * 100;

    level++;

    showToast(
      "🔥 LEVEL UP! LEVEL " + level
    );
  }


  updateUI();
}


/* =========================
   UI
========================= */

function updateUI() {

  scoreEl.textContent =
    score.toLocaleString("id-ID");

  xpEl.textContent =
    xp.toLocaleString("id-ID");

  coinsEl.textContent =
    coins.toLocaleString("id-ID");

  levelEl.textContent = level;

  playedEl.textContent = played;

  leaderXPEl.textContent =
    (8430 + score).toLocaleString("id-ID") +
    " XP";
}


/* =========================
   OPEN GAME
========================= */

function openGame(name) {

  played++;

  updateUI();

  showToast(
    "🎮 " + name + " dibuka!"
  );

  if (!autoPlaying) {

    showToast(
      "🕹️ Gunakan analog untuk bergerak"
    );
  }
}


/* =========================
   SKIN
========================= */

function selectSkin(skin) {

  if (skin === "👑" && !vipActive) {

    showToast(
      "👑 Skin ini khusus VIP"
    );

    return;
  }

  currentSkin = skin;

  player.textContent = skin;

  document
    .querySelectorAll(".skin")
    .forEach(btn => {
      btn.classList.remove("active");
    });

  event.currentTarget.classList.add("active");

  showToast(
    "🎨 Skin dipilih: " + skin
  );
}


/* =========================
   VIP GAME PASS
========================= */

function activateVIP() {

  vipActive = true;

  document.getElementById("vipStatus")
    .textContent = "VIP 👑";

  showToast(
    "👑 VIP Game Pass aktif! Fitur kosmetik terbuka."
  );
}


/* =========================
   ANALOG
========================= */

let dragging = false;

joystickBase.addEventListener(
  "pointerdown",
  function(e) {

    dragging = true;

    joystickBase.setPointerCapture(e.pointerId);

    stopAutoPlay();

    moveJoystick(e);
  }
);


joystickBase.addEventListener(
  "pointermove",
  function(e) {

    if (!dragging) return;

    moveJoystick(e);
  }
);


joystickBase.addEventListener(
  "pointerup",
  resetJoystick
);


joystickBase.addEventListener(
  "pointercancel",
  resetJoystick
);


function moveJoystick(e) {

  const rect =
    joystickBase.getBoundingClientRect();

  const centerX =
    rect.left + rect.width / 2;

  const centerY =
    rect.top + rect.height / 2;

  let dx = e.clientX - centerX;
  let dy = e.clientY - centerY;

  const max = 25;

  const distance =
    Math.sqrt(dx * dx + dy * dy);

  if (distance > max) {

    dx = dx / distance * max;
    dy = dy / distance * max;
  }

  joystickStick.style.transform =
    `translate(${dx}px, ${dy}px)`;

  movePlayer(dx / max, dy / max);
}


function resetJoystick() {

  dragging = false;

  joystickStick.style.transform =
    "translate(0,0)";
}


function movePlayer(x, y) {

  const screen =
    document.getElementById("gameScreen");

  const rect =
    screen.getBoundingClientRect();

  playerX += x * 1.8;
  playerY += y * 1.8;

  playerX =
    Math.max(7, Math.min(93, playerX));

  playerY =
    Math.max(12, Math.min(88, playerY));

  player.style.left =
    playerX + "%";

  player.style.top =
    playerY + "%";

  player.style.transform =
    "translate(-50%,-50%)";
}


/* =========================
   KEYBOARD CONTROL
========================= */

document.addEventListener(
  "keydown",
  function(e) {

    const key =
      e.key.toLowerCase();

    if (
      key === "arrowup" ||
      key === "w"
    ) {
      stopAutoPlay();
      movePlayer(0,-1);
    }

    if (
      key === "arrowdown" ||
      key === "s"
    ) {
      stopAutoPlay();
      movePlayer(0,1);
    }

    if (
      key === "arrowleft" ||
      key === "a"
    ) {
      stopAutoPlay();
      movePlayer(-1,0);
    }

    if (
      key === "arrowright" ||
      key === "d"
    ) {
      stopAutoPlay();
      movePlayer(1,0);
    }

  }
);


/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {

  document
    .getElementById("mobileMenu")
    .classList.toggle("active");

}


/* =========================
   TOAST
========================= */

function showToast(message) {

  const toast =
    document.getElementById("toast");

  const text =
    document.getElementById("toastText");

  text.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 2300);
}


/* =========================
   START
========================= */

window.addEventListener(
  "load",
  function() {

    player.classList.add("auto");

    autoTimer =
      setInterval(autoGame, 700);

    updateUI();

  }
);
