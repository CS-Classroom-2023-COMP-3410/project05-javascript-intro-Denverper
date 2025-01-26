const display = document.getElementById("display");
let currentInput = "";
let previousInput = "";
let operator = null;
let memory = 0;

// Update the display
function updateDisplay(value) {
  display.textContent = value || "0";
}

// Handle number and decimal button clicks
function handleNumber(number) {
  if (number === "." && currentInput.includes(".")) return; // Prevent multiple decimals
  currentInput += number;
  updateDisplay(currentInput);
}

// Handle operator button clicks
function handleOperator(op) {
    console.log("op: ", op);
    console.log("currentInput: ", currentInput);
    console.log("previousInput: ", previousInput);
    console.log("operator: ", operator);
  if (currentInput === "") {
    if (previousInput === "") return;
    operator = op;
    return;
  }
  if (op === "√") {
    currentInput = Math.sqrt(parseFloat(currentInput)).toString();
    updateDisplay(currentInput);
    return;
  }
  if (previousInput !== "") calculate(); // Perform any pending calculation
  operator = op;
  previousInput = currentInput;
  currentInput = "";
}

// Perform the calculation
function calculate() {
  const a = parseFloat(previousInput);
  const b = parseFloat(currentInput);
  let result = 0;

  if (isNaN(a) || isNaN(b)) return;

  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "×":
      result = a * b;
      break;
    case "÷":
      result = b !== 0 ? a / b : "Error"; // Handle division by zero
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = null;
  previousInput = "";
  updateDisplay(currentInput);
}

// Clear the calculator
function clearCalculator() {
  currentInput = "";
  previousInput = "";
  operator = null;
  updateDisplay("0");
}

// Handle memory functions
function handleMemory(action) {
  if (action === "MR") {
    currentInput = memory.toString();
    updateDisplay(currentInput);
  } else if (action === "M+") {
    memory = parseFloat(currentInput || "0");
  }
}

// Handle button clicks
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (!isNaN(value) || value === ".") {
      handleNumber(value);
    } else if (value === "C") {
      clearCalculator();
    } else if (value === "=") {
      calculate();
    } else if (value === "MR" || value === "M+") {
      handleMemory(value);
    } else {
      handleOperator(value);
    }
  });
});

// Handle keyboard input
document.addEventListener("keydown", (e) => {
    const key = e.key;
  
    if (!isNaN(key) || key === ".") {
      handleNumber(key);
    } else if (key === "Enter" || key === "=") {
      calculate();
    } else if (key === "Escape" || key.toLowerCase() === "c") {
      clearCalculator();
    } else if (key === "+") {
      handleOperator("+");
    } else if (key === "-") {
      handleOperator("-");
    } else if (key === "*" || key === "×") {
      handleOperator("×");
    } else if (key === "/" ) {
      handleOperator("÷");
    } else if (key.toLowerCase() === "s") {
      handleOperator("√");
    } else if (key.toLowerCase() === "m") {
      handleMemory("M+");
    } else if (key.toLowerCase() === "r") {
      handleMemory("MR");
    }
  });
  

// Initialize the calculator
updateDisplay("0");
