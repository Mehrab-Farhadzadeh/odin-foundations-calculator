// ******************
// *** Calculator ***
// ******************

let displayedNumber_Global = "0";

function getCountOfDigitsBeforeDot(str) {
   const splitted = str.split(".");
   return splitted[0].length;
}
function getCountOfDigitsAfterDot(str) {
   const splitted = str.split(".");
   return splitted[1].length;
}
function showAlert(msg) {
   const node = document.querySelector(".screen .alert");
   node.textContent = msg;
   setTimeout(function () {
      node.textContent = "";
   }, 1500);
}
function setResultFontSize(displayedNumber_Global) {
   const screen = document.querySelector(".screen .result");
   if (displayedNumber_Global.length > 12) screen.style.fontSize = "1.9rem";
   else screen.style.fontSize = "2.5em";
}
function isTooLongToDisplay(displayedNumber_Global) {
   if (displayedNumber_Global.includes(".")) {
      if (getCountOfDigitsAfterDot(displayedNumber_Global) > 3) {
         showAlert("Can't enter more than 4 digits after decimal point.");
         return true;
      }
   } else if (getCountOfDigitsBeforeDot(displayedNumber_Global) > 11) {
      showAlert("Can't enter more than 12 digits.");
      return true;
   }
   return false;
}
function getThousandSeparatedNum(number) {
   const splitted = number.split(".");
   const res = splitted[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   if (!number.includes(".")) return res;
   return `${res}.${splitted[1]}`;
}
function populateScreen(event) {
   if (isTooLongToDisplay(displayedNumber_Global)) return;
   if (displayedNumber_Global === "0") displayedNumber_Global = "";
   displayedNumber_Global += event.target.textContent;
   const screen = document.querySelector(".screen .result");
   screen.textContent = getThousandSeparatedNum(displayedNumber_Global);
   setResultFontSize(displayedNumber_Global);
}

// *** mouse ***
// * numbers *
function activateNumButton(id) {
   const numButton = document.getElementById(id);
   numButton.addEventListener("click", populateScreen);
}
function activateNumButtons() {
   const numButtonsId = [
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
   for (const id of numButtonsId) {
      activateNumButton(id);
   }
}
activateNumButtons();

// * dot *
const buttonDot = document.getElementById("dot");
buttonDot.addEventListener("click", (e) => {
   const screen = document.querySelector(".screen .result");
   if (displayedNumber_Global.includes(".")) return;
   if (getCountOfDigitsBeforeDot(displayedNumber_Global) <= 12) {
      displayedNumber_Global += e.target.textContent;
      screen.textContent = getThousandSeparatedNum(displayedNumber_Global);
   } else {
      showAlert("Can't enter more than 12 digits.");
   }
   setResultFontSize(displayedNumber_Global);
});

// * backspace *
const buttonBackspace = document.getElementById("backspace");
buttonBackspace.addEventListener("click", () => {
   if (displayedNumber_Global === "0") displayOperatorInHistory("");
   displayedNumber_Global = displayedNumber_Global.slice(0, -1);
   if (displayedNumber_Global === "") displayedNumber_Global = "0";
   const screen = document.querySelector(".screen .result");
   screen.textContent = getThousandSeparatedNum(displayedNumber_Global);
   setResultFontSize(displayedNumber_Global);
});

// * Ac *
const buttonAc = document.getElementById("ac");
buttonAc.addEventListener("click", () => {
   displayedNumber_Global = "0";
   setResultFontSize(displayedNumber_Global);
   document.querySelector(".screen .result").textContent = "0";
   document.querySelector(".screen .number").textContent = "";
   document.querySelector(".screen .operator").textContent = "";
});
