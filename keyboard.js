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

function addStyleToButton(id) {
   const numButton = document.getElementById(id);
   numButton.classList.add("pressed");
}
function removeStyleFromButton(id) {
   const numButton = document.getElementById(id);
   numButton.classList.remove("pressed");
}
function activateButtonKeyDown(event) {
   // * numbers *
   if (event.key in ID_S.numbers) {
      addStyleToButton(ID_S.numbers[event.key]);
      populateScreen(event.key);
   }

   // * operators *
   if (event.key in ID_S.operators) {
      addStyleToButton(ID_S.operators[event.key]);
      handleOperatorButton(event.key);
   }

   // * equals *
   if (ID_S[event.key] === "equals") {
      addStyleToButton(ID_S[event.key]);
      equals();
   }

   // * dot *
   if (ID_S[event.key] === "dot") {
      addStyleToButton(ID_S[event.key]);
      dot();
   }

   // * backspace *
   if (ID_S[event.key] === "backspace") {
      addStyleToButton(ID_S[event.key]);
      backspace();
   }

   // * ac *
   if (ID_S[event.key] === "ac") {
      addStyleToButton(ID_S[event.key]);
      ac();
   }
}
function activateButtonKeyUp(event) {
   // * numbers *
   if (event.key in ID_S.numbers)
      removeStyleFromButton(ID_S.numbers[event.key]);

   // * operators *
   if (event.key in ID_S.operators)
      removeStyleFromButton(ID_S.operators[event.key]);

   // * equals *
   if (ID_S[event.key] === "equals") removeStyleFromButton(ID_S[event.key]);

   // * dot *
   if (ID_S[event.key] === "dot") removeStyleFromButton(ID_S[event.key]);

   // * backspace *
   if (ID_S[event.key] === "backspace") removeStyleFromButton(ID_S[event.key]);

   // * ac *
   if (ID_S[event.key] === "ac") removeStyleFromButton(ID_S[event.key]);
}
function activateButtonsKeyboard() {
   window.addEventListener("keydown", activateButtonKeyDown);
   window.addEventListener("keyup", activateButtonKeyUp);
}
activateButtonsKeyboard();
