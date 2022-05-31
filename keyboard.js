// **************
// ** keyboard **
// **************
const ID_S = {
   Escape: "ac",
   Backspace: "backspace",
   Delete: "backspace",
   operators: {
      "/": "divide",
      "*": "multiply",
      "-": "minus",
      "+": "plus",
   },
   Enter: "equals",
   ".": "dot",
   numbers: {
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
   },
};

function activateButtonKeyDown(event) {
   // * numbers *
   if (event.key in ID_S.numbers) {
      const numButton = document.getElementById(ID_S.numbers[event.key]);
      numButton.classList.add("pressed");
      populateScreen(event.key);
   }
   // * operators *
   if (event.key in ID_S.operators) {
      handleOperatorButton(event.key);
   }
   // * equals *
   if (ID_S[event.key] === "equals") equals();

   // * dot *
   if (ID_S[event.key] === "dot") dot();

   // * backspace *
   if (ID_S[event.key] === "backspace") backspace();

   // * ac *
   if (ID_S[event.key] === "ac") ac();
}
function activateButtonKeyUp(event) {
   if (event.key in ID_S.numbers) {
      const numButton = document.getElementById(ID_S.numbers[event.key]);
      numButton.classList.remove("pressed");
   }
}
function activateButtonsKeyboard() {
   window.addEventListener("keydown", activateButtonKeyDown);
   window.addEventListener("keyup", activateButtonKeyUp);
}
activateButtonsKeyboard();
