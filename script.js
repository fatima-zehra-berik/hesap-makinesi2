const screen = document.getElementById("screen");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let currentOperator = "";
let firstValue = "";
let secondValue = "";
let resultDisplayed = false;

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const number = button.dataset.number;
    const action = button.dataset.action;

    if (number !== undefined) {
      if (resultDisplayed) {
        currentInput = "";
        resultDisplayed = false;
      }
      currentInput += number;
      screen.innerText = currentInput;
    }

    if (action !== undefined) {
      handleAction(action);
    }
  });
});

function handleAction(action) {

  if (action === "clear") {
    currentInput = "";
    firstValue = "";
    secondValue = "";
    currentOperator = "";
    screen.innerText = "0";
    return;
  }

  if (action === "back") {
    currentInput = currentInput.slice(0, -1);
    screen.innerText = currentInput || "0";
    return;
  }

  if (action === "percent") {
    currentInput = (parseFloat(currentInput) / 100).toString();
    screen.innerText = currentInput;
    return;
  }

  if (action === "square") {
    currentInput = (parseFloat(currentInput) ** 2).toString();
    screen.innerText = currentInput;
    resultDisplayed = true;
    return;
  }

  if (action === "sqrt") {
    currentInput = Math.sqrt(parseFloat(currentInput)).toString();
    screen.innerText = currentInput;
    resultDisplayed = true;
    return;
  }

  if (action === "sign") {
    currentInput = (parseFloat(currentInput) * -1).toString();
    screen.innerText = currentInput;
    return;
  }

  if (action === "+" || action === "-" || action === "*" || action === "/") {
    firstValue = currentInput;
    currentOperator = action;
    currentInput = "";
    return;
  }

  if (action === "=") {
    secondValue = currentInput;
    let result = 0;

    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(secondValue);

    switch (currentOperator) {
      case "+": result = num1 + num2; break;
      case "-": result = num1 - num2; break;
      case "*": result = num1 * num2; break;
      case "/": result = num1 / num2; break;
    }

    screen.innerText = result;
    currentInput = result.toString();
    resultDisplayed = true;
  }
}