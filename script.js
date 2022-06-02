// ***********************
// **** Theme Palette ****
// ***********************
const ACTIVE_THEME_CLASS_NAME = "active";

function getCurrentTheme() {
   return document.body.classList[0];
}
function toggleActiveButton(newButton) {
   const currentActiveButton = document.querySelector(
      ".themePalette button.active"
   );
   currentActiveButton.classList.remove(ACTIVE_THEME_CLASS_NAME);
   newButton.classList.add(ACTIVE_THEME_CLASS_NAME);
}
function applyTheme(newTheme) {
   const currentTheme = getCurrentTheme();
   const elements = [
      document.body,
      document.querySelector(".calculator"),
      document.querySelector(".screen"),
      ...document.querySelectorAll(".calculator button"),
      document.querySelector("footer"),
   ];
   for (const element of elements) {
      element.className = element.className.replace(currentTheme, newTheme);
   }
}
function applyChosenTheme() {
   const newTheme = this.classList[0];
   applyTheme(newTheme);
   toggleActiveButton(this);
}
function activateThemePalette() {
   const themeButtons = document.querySelectorAll(".themePalette button");
   themeButtons.forEach((element) => {
      element.addEventListener("click", applyChosenTheme);
   });
}

activateThemePalette();

// ***********************
// **** Sound Effects ****
// ***********************

let soundProfile = "volume_up";
const soundProfileButton = document.querySelector(".sound-profile button");
function applyChosenSoundProfile() {
   const i = this.querySelector("i");
   soundProfile = i.textContent;
   if (soundProfile === "volume_up") {
      soundProfile = "volume_off";
   } else if (soundProfile === "volume_down") {
      soundProfile = "volume_up";
      playSoundEffects("ac");
   } else if (soundProfile === "volume_off") {
      soundProfile = "volume_down";
      playSoundEffects("default");
   }
   i.textContent = soundProfile;
}
soundProfileButton.addEventListener("click", applyChosenSoundProfile);

function playSoundEffects(cls) {
   if (soundProfile === "volume_off") return;
   if (soundProfile === "volume_down" && cls !== "error") cls = "default";
   const currentTheme = getCurrentTheme();
   const audio = document.querySelector(`audio.${cls}.${currentTheme}`);
   if (!audio) console.log("Audio not found.");
   audio.currentTime = 0;
   audio.play();
}
