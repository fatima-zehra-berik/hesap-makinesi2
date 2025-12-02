const screen = document.getElementById("screen");
const buttons = document.querySelectorAll(".btn");

let firstOperand = null;
let operator = null;
let waitingForSecond = false; // Yeni sayı girişi bekleniyor mu?

function updateScreen(value) {
  // Çok uzun sayıları biraz kısaltalım
  const text = value.toString();
  screen.textContent = text.length > 12 ? Number(value).toPrecision(10) : text;
}

function inputNumber(num) {
  if (waitingForSecond) {
    // Yeni işlem başladığında ekrana direkt yaz
    screen.textContent = num === "." ? "0." : num;
    waitingForSecond = false;
  } else {
    if (screen.textContent === "0" && num !== ".") {
      screen.textContent = num;
    } else {
      // Nokta kontrolü
      if (num === "." && screen.textContent.includes(".")) return;
      screen.textContent += num;
    }
  }
}

function clearAll() {
  firstOperand = null;
  operator = null;
  waitingForSecond = false;
  updateScreen(0);
}

function backspace() {
  let text = screen.textContent;
  if (text.length <= 1) {
    updateScreen(0);
  } else {
    updateScreen(text.slice(0, -1));
  }
}

function calculate(a, op, b) {
  a = Number(a);
  b = Number(b);
  if (isNaN(a) || isNaN(b)) return b;

  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b === 0 ? "Hata" : a / b;
    default: return b;
  }
}

function handleOperator(nextOperator) {
  const inputValue = Number(screen.textContent);

  if (operator && waitingForSecond) {
    // Operatörü değiştirmek isterse (örn: + yerine ×)
    operator = nextOperator;
    return;
  }

  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, operator, inputValue);
    firstOperand = result;
    updateScreen(result);
  }

  operator = nextOperator;
  waitingForSecond = true;
}

function handleEquals() {
  const inputValue = Number(screen.textContent);

  if (operator === null || firstOperand === null) return;

  const result = calculate(firstOperand, operator, inputValue);
  updateScreen(result);
  firstOperand = result;
  operator = null;
  waitingForSecond = true;

  // Mini konfeti efekti :) (çok basit)
  const toast = document.createElement("div");
  toast.textContent = "🎉 Hoş geldin 🎉";
  toast.style.position = "fixed";
  toast.style.top = "20px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "rgba(0,0,0,0.7)";
  toast.style.color = "#fff";
  toast.style.padding = "8px 14px";
  toast.style.borderRadius = "999px";
  toast.style.fontSize = "14px";
  toast.style.zIndex = "9999";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1200);
}

function handlePercent() {
  let value = Number(screen.textContent);
  if (isNaN(value)) return;

  if (firstOperand !== null && operator) {
    // Normal hesap makineleri gibi: a + b% = a + (a * b / 100)
    value = (firstOperand * value) / 100;
  } else {
    value = value / 100;
  }
  updateScreen(value);
}

function handleSquare() {
  let value = Number(screen.textContent);
  if (isNaN(value)) return;
  updateScreen(value * value);
  waitingForSecond = true;
}

function handleSqrt() {
  let value = Number(screen.textContent);
  if (isNaN(value)) return;
  if (value < 0) {
    updateScreen("Hata");
    return;
  }
  updateScreen(Math.sqrt(value));
  waitingForSecond = true;
}

function handleSign() {
  let value = Number(screen.textContent);
  if (isNaN(value)) return;
  updateScreen(value * -1);
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const number = btn.dataset.number;
    const action = btn.dataset.action;

    if (number !== undefined) {
      inputNumber(number);
      return;
    }

    if (!action) return;

    switch (action) {
      case "clear":
        clearAll();
        break;
      case "back":
        backspace();
        break;
      case "percent":
        handlePercent();
        break;
      case "square":
        handleSquare();
        break;
      case "sqrt":
        handleSqrt();
        break;
      case "sign":
        handleSign();
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        handleOperator(action);
        break;
      case "=":
        handleEquals();
        break;
    }
  });
});

// Başlangıç ekranı
updateScreen(0);