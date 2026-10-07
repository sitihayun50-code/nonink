const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".nav");
const pageTitle = document.getElementById("pageTitle");
const toast = document.getElementById("toast");

const titles = {
  home: "Halo, Nazuan! 👋",
  games: "Game Library 🎮",
  leaderboard: "Leaderboard 🏆",
  vip: "VIP Membership 👑",
  settings: "Settings ⚙️"
};


// ===============================
// TOAST
// ===============================

function showToast(message) {
  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}


// ===============================
// NAVIGASI
// ===============================

function openPage(pageName) {

  // Sembunyikan semua halaman
  pages.forEach(page => {
    page.classList.remove("active-page");
  });


  // Tampilkan halaman yang dipilih
  const selectedPage =
    document.getElementById(pageName);

  if (selectedPage) {
    selectedPage.classList.add("active-page");
  }


  // Update tombol sidebar
  navButtons.forEach(button => {

    button.classList.remove("active");

    if (button.dataset.page === pageName) {
      button.classList.add("active");
    }

  });


  // Update judul
  pageTitle.textContent =
    titles[pageName] || "Nazuan Gaming";


  // Simpan halaman
  localStorage.setItem(
    "currentPage",
    pageName
  );


  // Update URL tanpa reload
  history.replaceState(
    null,
    "",
    "#" + pageName
  );
}


// Klik menu sidebar
navButtons.forEach(button => {

  button.addEventListener("click", () => {

    const page =
      button.dataset.page;

    openPage(page);

  });

});


// ===============================
// TOMBOL "LIHAT SEMUA"
// ===============================

document.querySelectorAll("[data-go]")
  .forEach(button => {

    button.addEventListener("click", () => {

      openPage(button.dataset.go);

    });

  });


// ===============================
// PLAY NOW
// ===============================

document
  .getElementById("playBtn")
  .addEventListener("click", () => {

    let currentXP =
      Number(
        document
          .getElementById("xp")
          .textContent
          .replace(",", "")
      );

    currentXP += 250;


    document.getElementById("xp")
      .textContent =
      currentXP.toLocaleString("id-ID");


    showToast(
      "🎮 Game dimulai! +250 XP"
    );

  });


// ===============================
// GAME BUTTON
// ===============================

document
  .querySelectorAll(".play-game, .game-btn")
  .forEach(button => {

    button.addEventListener("click", () => {

      const card =
        button.closest(".game-card");

      const gameName =
        card.querySelector("h3").textContent;

      showToast(
        `🎮 ${gameName} dimulai!`
      );

    });

  });


// ===============================
// VIP
// ===============================

document
  .getElementById("vipBtn")
  .addEventListener("click", () => {

    showToast(
      "👑 Selamat datang di VIP!"
    );

  });


// ===============================
// DARK MODE
// ===============================

const themeBtn =
  document.getElementById("themeBtn");

const darkToggle =
  document.getElementById("darkToggle");


function setDarkMode(isDark) {

  if (isDark) {

    document.body.classList.remove("light");

    themeBtn.textContent =
      "🌙 Dark Mode";

  } else {

    document.body.classList.add("light");

    themeBtn.textContent =
      "☀️ Light Mode";

  }

  localStorage.setItem(
    "darkMode",
    isDark
  );


  if (darkToggle) {
    darkToggle.checked = isDark;
  }

}


themeBtn.addEventListener("click", () => {

  const isDark =
    !document.body.classList.contains("light");

  setDarkMode(!isDark);

});


// Toggle di Settings
darkToggle.addEventListener(
  "change",
  () => {

    setDarkMode(
      darkToggle.checked
    );

  }
);


// ===============================
// NOTIFICATION
// ===============================

document
  .getElementById("notificationToggle")
  .addEventListener("change", function () {

    if (this.checked) {

      showToast(
        "🔔 Notifikasi diaktifkan"
      );

    } else {

      showToast(
        "🔕 Notifikasi dimatikan"
      );

    }

  });


// ===============================
// SOUND
// ===============================

document
  .getElementById("soundToggle")
  .addEventListener("change", function () {

    if (this.checked) {

      showToast(
        "🔊 Sound Effects aktif"
      );

    } else {

      showToast(
        "🔇 Sound Effects mati"
      );

    }

  });


// ===============================
// LOAD SETTING
// ===============================

const savedTheme =
  localStorage.getItem("darkMode");

if (savedTheme !== null) {

  setDarkMode(
    savedTheme === "true"
  );

}


// ===============================
// LOAD HALAMAN
// ===============================

let savedPage =
  localStorage.getItem("currentPage");


// Kalau URL punya #games, misalnya
const hash =
  window.location.hash.replace("#", "");

if (hash && document.getElementById(hash)) {
  savedPage = hash;
}


// Default Home
if (!savedPage) {
  savedPage = "home";
}


openPage(savedPage);


// ===============================
// BROWSER BACK / FORWARD
// ===============================

window.addEventListener(
  "popstate",
  () => {

    const page =
      window.location.hash.replace("#", "");

    if (
      page &&
      document.getElementById(page)
    ) {

      openPage(page);

    }

  }
);
