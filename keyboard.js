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

// * numbers *
function activateNumButtonKeyDown(event) {
   if (!(event.key in ID_S.numbers)) return;
   const numButton = document.getElementById(ID_S.numbers[event.key]);
   numButton.classList.add("pressed");
   populateScreen(event.key);
}
function activateNumButtonKeyUp(event) {
   if (!(event.key in ID_S.numbers)) return;
   const numButton = document.getElementById(ID_S.numbers[event.key]);
   numButton.classList.remove("pressed");
}
function activateNumButtonsKeyboard() {
   window.addEventListener("keydown", activateNumButtonKeyDown);
   window.addEventListener("keyup", activateNumButtonKeyUp);
}
activateNumButtonsKeyboard();