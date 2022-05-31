// ******************
// *** Calculator ***
// ******************

let displayedNumber_Global = "0";
let previousEnteredNumber_Global;

function getCountOfDigitsBeforeDot(str) {
   const splitted = str.split(".");
   return splitted[0].replace(/[^0-9]/g, "").length;
}
function getCountOfDigitsAfterDot(str) {
   const splitted = str.split(".");
   return splitted[1].replace(/[^0-9]/g, "").length;
}
function getDigits(str) {
   return str.replace(/[^0-9]/g, "");
}
function showAlert(msg) {
   const node = document.querySelector(".screen .alert");
   node.textContent = msg;
   setTimeout(function () {
      node.textContent = "";
   }, 1500);
}
function setResultFontSize(number) {
   const screen = document.querySelector(".screen .result");
   if (
      number.length > 12 ||
      (previousEnteredNumber_Global !== undefined &&
         previousEnteredNumber_Global.length > 12)
   )
      screen.style.fontSize = "1.9rem";
   else screen.style.fontSize = "2.5em";
}
function isTooLongToDisplay(number) {
   if (number.includes(".")) {
      if (getCountOfDigitsAfterDot(number) > 3) {
         showAlert("Can't enter more than 4 digits after decimal point.");
         return true;
      }
   } else if (getCountOfDigitsBeforeDot(number) > 11) {
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
function populateScreen(digit) {
   if (isTooLongToDisplay(displayedNumber_Global)) return;
   if (displayedNumber_Global === "0" || displayedNumber_Global === "waiting")
      displayedNumber_Global = "";
   displayedNumber_Global += digit;
   const screen = document.querySelector(".screen .result");
   screen.textContent = getThousandSeparatedNum(displayedNumber_Global);
   setResultFontSize(displayedNumber_Global);
}
function isTooLongToDisplayCalculated(result) {
   if (getCountOfDigitsBeforeDot(result) > 12) {
      showAlert("Calculation outside of accepted range.");
      resetToLastResult(previousEnteredNumber_Global);
      return true;
   }
   return false;
}
function getOperatorFromHistory() {
   return document.querySelector(".history span.operator").textContent;
}
function displayOperatorInHistory(operator) {
   const operatorSpan = document.querySelector(".history span.operator");
   operatorSpan.textContent = operator;
}
function operate(operator, a, b) {
   switch (operator) {
      case "+":
         return a + b;
      case "-":
         return a - b;
      case "*":
         return a * b;
      case "/":
         return a / b;
   }
   return result;
}
function displayOnScreen(result) {
   if (isTooLongToDisplayCalculated(result)) return false;
   const screen = document.querySelector(".screen .result");
   screen.textContent = getThousandSeparatedNum(result);
   setResultFontSize(result);
   return true;
}
function isReallyNaN(result) {
   return isNaN(parseFloat(result));
}
function resetToLastResult(lastResult) {
   displayedNumber_Global = lastResult;
   displayOnScreen(lastResult);
   document.querySelector(".screen .operator").textContent = "";
}
function resetToCalculatedResult(calculatedResult) {
   displayedNumber_Global = calculatedResult;
   displayOnScreen(`=${calculatedResult}`);
   document.querySelector(".screen .operator").textContent = "";
}
// *** mouse ***
// * numbers *
function activateNumButton(id) {
   const numButton = document.getElementById(id);
   numButton.addEventListener("click", (e) => {
      populateScreen(e.target.textContent);
   });
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

// * operators *
function handleOperatorButton(event) {
   if (getOperatorFromHistory() === "") {
      displayOperatorInHistory(event.target.textContent);
      previousEnteredNumber_Global = displayedNumber_Global;
      displayedNumber_Global = "waiting";
      return;
   }
   if (displayedNumber_Global == "waiting") {
      displayOperatorInHistory(event.target.textContent);
      return;
   }
   const result = operate(
      getOperatorFromHistory(),
      +previousEnteredNumber_Global,
      +displayedNumber_Global
   ).toLocaleString(undefined, {
      maximumFractionDigits: 4,
      useGrouping: false,
   });
   displayOperatorInHistory(event.target.textContent);
   if (isReallyNaN(result)) {
      showAlert("Can't divide by zero.");
      resetToLastResult(previousEnteredNumber_Global);
      return;
   }
   if (!displayOnScreen(result)) return;
   previousEnteredNumber_Global = result;
   displayedNumber_Global = "waiting";
}
function activateOperatorButton(id) {
   const opButton = document.getElementById(id);
   opButton.addEventListener("click", handleOperatorButton);
}
function activateOperatorButtons() {
   const operatorButtonsId = ["divide", "multiply", "minus", "plus"];
   for (const id of operatorButtonsId) {
      activateOperatorButton(id);
   }
}
activateOperatorButtons();

// * equals *
const buttonEquals = document.getElementById("equals");
buttonEquals.addEventListener("click", () => {
   if (getOperatorFromHistory() === "") {
      if (!displayedNumber_Global.includes("="))
         displayOnScreen(`=${displayedNumber_Global}`);
      return;
   }
   if (displayedNumber_Global == "waiting") {
      showAlert("Invalid format used.");
      return;
   }
   const result = operate(
      getOperatorFromHistory(),
      +previousEnteredNumber_Global,
      +displayedNumber_Global
   ).toLocaleString(undefined, {
      maximumFractionDigits: 4,
      useGrouping: false,
   });
   if (isReallyNaN(result)) {
      showAlert("Can't divide by zero.");
      resetToLastResult(previousEnteredNumber_Global);
      return;
   }
   if (!displayOnScreen(result)) return;
   resetToCalculatedResult(result);
});

// * dot *
const buttonDot = document.getElementById("dot");
buttonDot.addEventListener("click", (e) => {
   const screen = document.querySelector(".screen .result");
   if (displayedNumber_Global.includes(".")) return;
   if (displayedNumber_Global === "waiting") displayedNumber_Global = "0";
   displayedNumber_Global += e.target.textContent;
   screen.textContent = getThousandSeparatedNum(displayedNumber_Global);
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
