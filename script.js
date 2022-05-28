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