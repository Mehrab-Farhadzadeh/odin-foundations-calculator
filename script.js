// Themes Changer
let currentTheme = "glass";

const themeButtonWhite = document.querySelector(".themePalette button.white");
const themeButtonGlass = document.querySelector(".themePalette button.glass");
const themeButtonBlack = document.querySelector(".themePalette button.black");

themeButtonWhite.addEventListener("click", changeTheme);
themeButtonGlass.addEventListener("click", changeTheme);
themeButtonBlack.addEventListener("click", changeTheme);

function changeTheme(event = document.createElement("button")) {
  switch (event.target.className) {
    case "white":
      changeTheme2("white");
      break;
    case "glass":
      changeTheme2("glass");
      break;
    case "black":
      changeTheme2("black");
      break;
    default:
      console.log(event.className);
  }
}

function changeTheme2(newTheme) {
  const elements = [];
  elements.push(document.querySelector(".calculator"));
  elements.push(document.querySelector(".screen .history"));
  elements.push(document.querySelector(".screen .result"));
  elements.push(...document.querySelectorAll(".calculator button"));
  for (const element of elements) {
    element.className = element.className.replace(currentTheme, newTheme);
  }
  currentTheme = newTheme;
}
