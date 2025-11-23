let themeMode = 0;
let windowsMode = 10;
let languageIndex = 0;

const translations = {
  0: {
    title: "Pengaturan",
    description:
      "Selamat datang di Pengaturan, untuk mengubah tampilan bahasa, tema, dan mode Windows, silakan pilih opsi yang diinginkan di bawah.",
    apply: "Terapkan",
    light: "Terang",
    dark: "Gelap",
  },
  1: {
    title: "Settings",
    description:
      "Welcome to Settings, to change the language, theme, and Windows mode, please select your desired options below.",
    apply: "Apply",
    light: "Light",
    dark: "Dark",
  },
};

function applyLanguage(lang) {
  const t = translations[lang];
  document.getElementById("titleWindow").textContent = t.title;
  document.getElementById("descriptionWindow").textContent = t.description;
  document.getElementById("Terapkan").textContent = t.apply;
  document.getElementById("Light").textContent = t.light;
  document.getElementById("Dark").textContent = t.dark;
}

function updateThemeAndLogo() {
  const storeLogo = document.querySelector(".store-badge");
  const ferryLogo = document.querySelector(".ferrylogo");

  document.body.classList.toggle("dark-mode", themeMode === 1);
  document.body.classList.toggle("light-mode", themeMode === 0);

  const langKey = languageIndex === 0 ? "ID" : "EN";
  const themeKey = themeMode === 1 ? "Dark" : "Light";
  storeLogo.src = `./AssetsIDA/download${themeKey}${langKey}.svg`;
  ferryLogo.src = `./AssetsIDA/Icons/${windowsMode}/ferryIcon.svg`;
}

function createSettingsWindow() {
  const templateTitle = `
    <div>
      <img src="/Icons/setting.svg" style="width: 50px;">
      <h1 id="titleWindow"></h1>
    </div>
    <p id="descriptionWindow"></p>
  `;

  const templateContent = `
    <select id="language">
      <option value="0">Indonesia</option>
      <option value="1">English</option>
    </select>
    <select id="WindowsMode">
      <option value="10">Windows 10</option>
      <option value="11">Windows 11</option>
    </select>
    <select id="ThemeMode">
      <option id="Light" value="0">Light</option>
      <option id="Dark" value="1">Dark</option>
    </select>
    <button class="ButtonApply" id="Terapkan" type="button"></button>
  `;

  document.body.insertBefore(createWindow(templateTitle, templateContent), document.body.children[1]);

  applyLanguage(languageIndex);
  document.getElementById("language").value = languageIndex;
  document.getElementById("WindowsMode").value = windowsMode;
  document.getElementById("ThemeMode").value = themeMode;

  const languageSelect = document.getElementById("language");
  languageSelect.addEventListener("change", (e) => {
    languageIndex = Number(e.target.value);
    applyLanguage(languageIndex);
  });

  setTimeout(() => {
    document.querySelector(".messageButtom-Window").classList.remove("gone");
  }, 100);

  document.getElementById("Terapkan").addEventListener("click", onApplySettings);
}

function onApplySettings() {
  if (localStorage.getItem("cookieConsent") === "accepted") {
    localStorage.setItem("preferredLanguage", languageIndex);
    localStorage.setItem("WindowsMode", windowsMode);
    localStorage.setItem("ThemeMode", themeMode);
  } else {
    console.warn("Your preferences won't be saved because cookies are not accepted.");
  }

  windowsMode = Number(document.getElementById("WindowsMode").value);
  themeMode = Number(document.getElementById("ThemeMode").value);

  changeImage(languageIndex, windowsMode, themeMode, lastSectionId || "HomePage");
  updateThemeAndLogo();

  document.querySelector(".messageButtom-Window").classList.add("gone");
  setTimeout(() => {
    document.querySelector(".messageButtom-Background")?.remove();
  }, 1000);
}

async function detectWindowsVersion() {
  if (!navigator.userAgentData) return 11;
  const ua = await navigator.userAgentData.getHighEntropyValues(["platformVersion"]);
  if (ua.platform === "Windows") {
    const majorVersion = parseInt(ua.platformVersion.split(".")[0]);
    return majorVersion >= 13 ? 11 : 10;
  }
  return 11;
}

document.addEventListener("DOMContentLoaded", async () => {
  if (localStorage.getItem("cookieConsent") === "accepted") {
    languageIndex = Number(localStorage.getItem("preferredLanguage")) || 0;
    themeMode = Number(localStorage.getItem("ThemeMode")) || 0;
    windowsMode =
      Number(localStorage.getItem("WindowsMode")) || (await detectWindowsVersion());
    localStorage.setItem("WindowsMode", windowsMode);
  } else {
    windowsMode = await detectWindowsVersion();
  }

  document.getElementById("SettingsNav").addEventListener("click", createSettingsWindow);
  updateThemeAndLogo();
});
