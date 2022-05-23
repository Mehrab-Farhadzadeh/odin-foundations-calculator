//  **** Theme Palette ****
function toggleAClassThroughElements(allElements, clsName, activatedElement) {
  for (const element of allElements) {
    if (element.className.includes(clsName)) element.classList.remove(clsName);
  }
  activatedElement.classList.add(clsName);
}
function getCurrentTheme() {
  return document.body.classList[0];
}
function activateTheme(newTheme) {
  const currentTheme = getCurrentTheme();
  const elements = [document.body];
  elements.push(document.querySelector(".calculator"));
  elements.push(document.querySelector(".screen .history"));
  elements.push(document.querySelector(".screen .result"));
  elements.push(...document.querySelectorAll(".calculator button"));
  elements.push(document.querySelector("footer"));
  for (const element of elements) {
    element.className = element.className.replace(currentTheme, newTheme);
  }
}
function changeTheme(event) {
  toggleAClassThroughElements(
    Array.from(document.querySelectorAll(".themePalette button")),
    "active",
    event.target
  );
  const newTheme = event.target.classList[0];
  switch (newTheme) {
    case "white":
      activateTheme("white");
      break;
    case "glass":
      activateTheme("glass");
      break;
    case "black":
      activateTheme("black");
      break;
    default:
      console.log(event.className);
  }
}
function activateThemePalette() {
  const themeButtons = document.querySelectorAll(".themePalette button");
  themeButtons.forEach((element) => {
    element.addEventListener("click", changeTheme);
  });
}

activateThemePalette();