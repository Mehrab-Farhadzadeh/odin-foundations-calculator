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
    document.querySelector(".screen .history"),
    document.querySelector(".screen .result"),
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

// ***************
// *** Buttons ***
// ***************
// function Button(id) {
//   this.
// }

function getCountOfDigits(str) {
  return str.replace(/[^0-9]/g, "").length;
}

function customAlert(msg) {
  const alert = document.querySelector(".screen .alert");
  alert.textContent = msg;
  setTimeout(function () {
    alert.textContent = "";
  }, 1500);
}

// *** numbers and operators ***
// ** mouse **
function activateNumButton(id) {
  const numButton = document.getElementById(id);
  numButton.addEventListener("mouseup", (e) => {
    if (document.querySelector(".screen .result").textContent.length < 12) {
      document.querySelector(".screen .result").textContent +=
        e.target.textContent;
    } else {
      customAlert("Can't enter more than 12 digits.");
    }
  });
}
function activateNumButtons() {
  const ID_S = [
    "dot",
    "divide",
    "multiply",
    "minus",
    "plus",
    "equals",
    "num0",
    "num1",
    "num2",
    "num3",
    "num4",
    "num5",
    "num6",
    "num7",
    "num8",
    "num9",
  ];
  for (const id of ID_S) {
    activateNumButton(id);
  }
}
activateNumButtons();
// * backspace
const buttonBackspace = document.getElementById("backspace");
buttonBackspace.addEventListener("mousedown", (e) => {});
buttonBackspace.addEventListener("mouseup", (e) => {
  document.querySelector(".screen .result").textContent = document
    .querySelector(".screen .result")
    .textContent.slice(0, -1);
});

// * Ac
const buttonAc = document.getElementById("ac");
buttonAc.addEventListener("mousedown", (e) => {});
buttonAc.addEventListener("mouseup", (e) => {
  document.querySelector(".screen .result").textContent = "0";
});

// ** keyboard **
const ID_S = {
  Escape: "ac",
  Backspace: "backspace",
  Delete: "backspace",
  "/": "divide",
  "*": "multiply",
  "-": "minus",
  "+": "plus",
  Enter: "equals",
  ".": "dot",
  0: "num0",
  1: "num1",
  2: "num2",
  3: "num3",
  4: "num4",
  5: "num5",
  6: "num6",
  7: "num7",
  8: "num8",
  9: "num9",
};

function activateNumButtonKeyDown(e) {
  if (!(e.key in ID_S)) return;

  const numButton = document.getElementById(ID_S[e.key]);
  numButton.classList.add("pressed");
  // ac
  if (ID_S[e.key] === "ac") {
    document.querySelector(".screen .result").textContent = "0";
    return;
  }
  // backspace
  if (ID_S[e.key] === "backspace") {
    document.querySelector(".screen .result").textContent = document
      .querySelector(".screen .result")
      .textContent.slice(0, -1);
    return;
  }

  // others
  if (document.querySelector(".screen .result").textContent.length < 12) {
    document.querySelector(".screen .result").textContent +=
      numButton.textContent;
  } else {
    customAlert("Can't enter more than 12 digits.");
  }
}

function activateNumButtonKeyUp(e) {
  if (!(e.key in ID_S)) return;

  const numButton = document.getElementById(ID_S[e.key]);
  numButton.classList.remove("pressed");
}

function activateNumButtonsKeyboard() {
  window.addEventListener("keydown", activateNumButtonKeyDown);
  window.addEventListener("keyup", activateNumButtonKeyUp);
}
activateNumButtonsKeyboard();
