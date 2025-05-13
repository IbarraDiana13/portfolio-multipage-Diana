const display = document.getElementById("display");
const history = document.getElementById("history");
const themeToggle = document.getElementById("themeToggle");
let memory = 0;
let lastCalculation = "";
let isLightTheme = false;

// Initialize calculator
function init() {
  clearDisplay();
  document.addEventListener("keydown", handleKeyPress);
  themeToggle.addEventListener("click", toggleTheme);
}

// Handle keyboard input
function handleKeyPress(e) {
  const key = e.key;

  if (/[0-9]/.test(key)) {
    appendValue(key);
  } else if (/[\+\-\*\/\(\)\.]/.test(key)) {
    appendValue(key);
  } else if (key === "Enter" || key === "=") {
    e.preventDefault();
    calculate();
  } else if (key === "Escape") {
    clearDisplay();
  } else if (key === "Backspace") {
    backspace();
  } else if (key === "%") {
    percentage();
  }
}

// Append value to display
function appendValue(val) {
  if (display.classList.contains("error")) {
    display.classList.remove("error");
  }

  if (display.textContent === "0" && val !== "." && !val.includes("Math.")) {
    display.textContent = val;
  } else {
    display.textContent += val;
  }
}

// Clear display
function clearDisplay() {
  display.textContent = "0";
  display.classList.remove("error", "success");
}

// Backspace function
function backspace() {
  if (
    display.textContent.length === 1 ||
    (display.textContent.length === 2 && display.textContent.startsWith("-"))
  ) {
    display.textContent = "0";
  } else {
    display.textContent = display.textContent.slice(0, -1);
  }
}

// Toggle sign
function toggleSign() {
  if (display.textContent.startsWith("-")) {
    display.textContent = display.textContent.substring(1);
  } else if (display.textContent !== "0") {
    display.textContent = "-" + display.textContent;
  }
}

// Calculate result
function calculate() {
  try {
    let expression = display.textContent;

    // Replace display symbols with JavaScript operators
    expression = expression
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/\^/g, "**");

    // Handle factorial
    expression = expression.replace(/(\d+)!/g, function (match, num) {
      return factorial(parseInt(num));
    });

    // Handle percentage
    expression = expression.replace(/([\d\.]+)%/g, function (match, num) {
      return parseFloat(num) / 100;
    });

    // Handle 1/x
    if (expression.startsWith("1/")) {
      expression = "1/" + expression.substring(2);
    }

    const result = eval(expression);

    if (isNaN(result) || !isFinite(result)) {
      throw new Error("Invalid calculation");
    }

    lastCalculation = `${display.textContent} = ${result}`;
    history.textContent = lastCalculation;
    display.textContent = result;
    display.classList.add("success");

    setTimeout(() => {
      display.classList.remove("success");
    }, 500);
  } catch (error) {
    display.textContent = "Error";
    display.classList.add("error");
    console.error("Calculation error:", error);
  }
}

// Memory functions
function memoryAdd() {
  memory += parseFloat(display.textContent) || 0;
  updateMemoryButtons();
}

function memorySubtract() {
  memory -= parseFloat(display.textContent) || 0;
  updateMemoryButtons();
}

function memoryClear() {
  memory = 0;
  updateMemoryButtons();
}

function memoryRecall() {
  display.textContent = memory;
}

function updateMemoryButtons() {
  const memoryButtons = document.querySelectorAll(".memory");
  memoryButtons.forEach((btn) => {
    if (memory !== 0) {
      btn.classList.add("active-memory");
    } else {
      btn.classList.remove("active-memory");
    }
  });
}

// Math functions
function square() {
  const num = parseFloat(display.textContent) || 0;
  display.textContent = `${num}²`;
  calculate();
}

function power() {
  appendValue("^");
}

function squareRoot() {
  const num = parseFloat(display.textContent) || 0;
  display.textContent = `Math.sqrt(${num})`;
  calculate();
}

function factorial(n) {
  if (arguments.length === 1) {
    if (n < 0) return NaN;
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  } else {
    const num = parseFloat(display.textContent) || 0;
    display.textContent = `${num}!`;
    calculate();
  }
}

function percentage() {
  const num = parseFloat(display.textContent) || 0;
  display.textContent = `${num}%`;
  calculate();
}

// Theme toggle
function toggleTheme() {
  isLightTheme = !isLightTheme;
  document.body.classList.toggle("light-theme", isLightTheme);
  themeToggle.innerHTML = isLightTheme
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
}

// Initialize calculator when page loads
window.onload = init;
