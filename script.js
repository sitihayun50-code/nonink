let coins = 2450;
let played = 24;


// MOBILE MENU
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");

  menu.classList.toggle("active");
}


// SCROLL KE GAME
function goGames() {
  document.getElementById("games").scrollIntoView({
    behavior: "smooth"
  });
}


// MAIN GAME
function playGame(gameName) {

  const reward = Math.floor(Math.random() * 100) + 25;

  coins += reward;
  played++;

  document.getElementById("coins").textContent =
    coins.toLocaleString("id-ID");

  document.getElementById("played").textContent = played;

  showToast(
    "🎮 " + gameName + " dimainkan! +" + reward + " koin virtual"
  );
}


// TOAST
function showToast(message) {

  const toast = document.getElementById("toast");
  const text = document.getElementById("toastText");

  text.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}


// INFO
function showInfo() {

  showToast(
    "ℹ️ NAZUAN PLAY adalah portal game dengan poin virtual."
  );

}


// FILTER
function filterGames() {

  showToast(
    "🎮 Filter game akan segera tersedia."
  );

}


// PROFILE
function editProfile() {

  const name = prompt(
    "Masukkan nama pemain:",
    "NAZUAN"
  );

  if (name && name.trim() !== "") {

    showToast(
      "👤 Profil diperbarui menjadi " + name
    );

  }

}
