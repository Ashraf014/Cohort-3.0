/* calculator making using js */

/*

// 1. Get DOM elements
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

// 2. Global variables to track calculator state
let currentInput = "0";
let previousInput = "";
let operator = "";
let shouldResetDisplay = false;

// 3. Main Event Listener for all buttons
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (isNumber(value) || value === ".") {
            handleNumber(value);
        } else if (isOperator(value)) {
            handleOperator(value);
        } else if (value === "=") {
            handleEquals();
        } else if (value === "C") {
            handleClear();
        } else if (value === "CE") {
            handleClearEntry();
        } else if (value === "%") {
            handlePercentage();
        }

        updateDisplay();
    });
});

// 4. Helper Functions
function isNumber(val) {
    return !isNaN(val);
}

function isOperator(val) {
    return ["+", "-", "*", "/"].includes(val);
}

function updateDisplay() {
    display.textContent = currentInput;
}

// 5. Logic Functions
function handleNumber(num) {
    // Prevent multiple decimals
    if (num === "." && currentInput.includes(".")) return;

    // Replace initial 0 or reset display after an operator click
    if (currentInput === "0" || shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        currentInput += num;
    }
}

function handleOperator(nextOperator) {
    const value = parseFloat(currentInput);

    // If operator is clicked and previous input exists, calculate first
    if (operator && !shouldResetDisplay) {
        currentInput = String(runMath(parseFloat(previousInput), operator, value));
    }

    previousInput = currentInput;
    operator = nextOperator;
    shouldResetDisplay = true;
}

function handleEquals() {
    if (!operator || shouldResetDisplay) return;

    const val1 = parseFloat(previousInput);
    const val2 = parseFloat(currentInput);

    currentInput = String(runMath(val1, operator, val2));
    operator = "";
    previousInput = "";
    shouldResetDisplay = true;
}

function handleClear() {
    currentInput = "0";
    previousInput = "";
    operator = "";
    shouldResetDisplay = false;
}

function handleClearEntry() {
    currentInput = "0";
}

function handlePercentage() {
    currentInput = String(parseFloat(currentInput) / 100);
}

// 6. Core Math Calculation Function
function runMath(a, op, b) {
    switch (op) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return b === 0 ? "Error" : a / b;
        default: return b;
    }
}


*/

/*

// 1. Get DOM elements
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

// 2. State variables
let currentInput = "0";
let previousInput = "";
let operator = "";
let shouldResetDisplay = false;

// 3. Event Listener for Clicks
buttons.forEach(button => {
    button.addEventListener("click", () => {
        processInput(button.textContent);
    });
});

// 4. Feature: Keyboard Event Listener
document.addEventListener("keydown", (event) => {
    let key = event.key;

    // Map keyboard keys to calculator actions
    if (key === "Enter") key = "=";
    if (key === "Escape") key = "CE";
    if (key === "Delete") key = "C";
    if (key === "Backspace") key = "←";

    // Allowed keys list
    const validKeys = [
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        ".", "+", "-", "*", "/", "%", "=", "CE", "C", "←"
    ];

    if (validKeys.includes(key)) {
        event.preventDefault(); // Stop page scrolling on space/arrow actions
        processInput(key);
    }
});

// 5. Central Input Processor
function processInput(value) {
    if (isNumber(value) || value === ".") {
        handleNumber(value);
    } else if (isOperator(value)) {
        handleOperator(value);
    } else if (value === "=") {
        handleEquals();
    } else if (value === "C") {
        handleClearDisplay(); // Clears only current display screen
    } else if (value === "CE") {
        handleClearAll();     // Resets entire calculation memory
    } else if (value === "←") {
        handleBackspace();    // Deletes single digit
    } else if (value === "%") {
        handlePercentage();
    }

    updateDisplay();
}

// 6. Logic Management Functions
function isNumber(val) {
    return !isNaN(val) && val !== " ";
}

function isOperator(val) {
    return ["+", "-", "*", "/"].includes(val);
}

function updateDisplay() {
    display.textContent = currentInput;
}

function handleNumber(num) {
    if (num === "." && currentInput.includes(".")) return;

    if (currentInput === "0" || shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        currentInput += num;
    }
}

function handleOperator(nextOperator) {
    const value = parseFloat(currentInput);

    if (operator && !shouldResetDisplay) {
        currentInput = String(runMath(parseFloat(previousInput), operator, value));
    }

    previousInput = currentInput;
    operator = nextOperator;
    shouldResetDisplay = true;
}

function handleEquals() {
    if (!operator || shouldResetDisplay) return;

    const val1 = parseFloat(previousInput);
    const val2 = parseFloat(currentInput);

    currentInput = String(runMath(val1, operator, val2));
    operator = "";
    previousInput = "";
    shouldResetDisplay = true;
}

// C: Clear current display view only
function handleClearDisplay() {
    currentInput = "0";
}

// CE: Reset full calculation state
function handleClearAll() {
    currentInput = "0";
    previousInput = "";
    operator = "";
    shouldResetDisplay = false;
}

// ←: Remove the last character typed
function handleBackspace() {
    if (shouldResetDisplay) return; // Prevent deleting outputs of finished evaluations

    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = "0";
    }
}

function handlePercentage() {
    currentInput = String(parseFloat(currentInput) / 100);
}

// 7. Execution Engine
function runMath(a, op, b) {
    switch (op) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return b === 0 ? "Error" : a / b;
        default: return b;
    }
}


*/
// 1. Get DOM elements
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

// 2. State variables
let currentInput = "0";      // Holds the current number being typed
let formulaExpression = "";  // Holds the complete multi-calculation string (e.g., "5 + 5 + 10")
let shouldResetDisplay = false;

// 3. Event Listener for Click Actions
buttons.forEach(button => {
    button.addEventListener("click", () => {
        processInput(button.textContent);
    });
});

// 4. Keyboard Listener
document.addEventListener("keydown", (event) => {
    let key = event.key;

    if (key === "Enter" || key === "NumpadEnter") {
        event.preventDefault(); 
        key = "=";
    }
    if (key === "Escape") key = "CE";
    if (key === "Delete") key = "C";
    if (key === "Backspace") key = "×"; 

    const validKeys = [
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        ".", "+", "-", "*", "/", "%", "=", "CE", "C", "×"
    ];

    if (validKeys.includes(key)) {
        processInput(key);
    }
});

// 5. Central Input Router
function processInput(value) {
    if (isNumber(value) || value === ".") {
        handleNumber(value);
    } else if (isOperator(value)) {
        handleOperator(value);
    } else if (value === "=") {
        handleEquals();
    } else if (value === "C") {
        handleClearDisplay();
    } else if (value === "CE") {
        handleClearAll();
    } else if (value === "×") {
        handleBackspace();
    } else if (value === "%") {
        handlePercentage();
    }

    updateDisplay();
}

// 6. Support Helpers
function isNumber(val) {
    return !isNaN(val) && val !== " ";
}

function isOperator(val) {
    return ["+", "-", "*", "/"].includes(val);
}

// Shows the full active formula sequence or the single current input
function updateDisplay() {
    if (formulaExpression !== "") {
        display.textContent = formulaExpression + " " + (shouldResetDisplay ? "" : currentInput);
    } else {
        display.textContent = currentInput;
    }
}

// 7. Logic Execution Subroutines
function handleNumber(num) {
    if (num === "." && currentInput.includes(".")) return;

    if (currentInput === "0" || shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        currentInput += num;
    }
}

// Fix: Stores operators into a chain text stream without evaluating instantly
function handleOperator(nextOperator) {
    // If user changes their mind on the operator right after clicking one
    if (shouldResetDisplay && formulaExpression !== "") {
        // Cut off the last operator and space, then append the new one
        formulaExpression = formulaExpression.slice(0, -2) + nextOperator;
        return;
    }

    if (formulaExpression === "") {
        formulaExpression = currentInput + " " + nextOperator;
    } else {
        formulaExpression += " " + currentInput + " " + nextOperator;
    }

    shouldResetDisplay = true;
}

// Fix: Computes the entire chained calculation string at once when Enter is hit
function handleEquals() {
    if (formulaExpression === "" || shouldResetDisplay) return;

    // Combine everything into the final formula text to evaluate
    const finalExpression = formulaExpression + " " + currentInput;
    
    try {
        // Sanitize symbols safely before clean execution
        const tokens = finalExpression.split(" ");
        let result = parseFloat(tokens[0]);

        for (let i = 1; i < tokens.length; i += 2) {
            const op = tokens[i];
            const nextValue = parseFloat(tokens[i + 1]);

            if (op === "+") result += nextValue;
            if (op === "-") result -= nextValue;
            if (op === "*") result *= nextValue;
            if (op === "/") {
                if (nextValue === 0) {
                    result = "Error";
                    break;
                }
                result /= nextValue;
            }
        }

        currentInput = String(result);
    } catch (err) {
        currentInput = "Error";
    }

    formulaExpression = ""; // Clear the background sequence storage
    shouldResetDisplay = true;
}

function handleClearDisplay() {
    currentInput = "0";
}

function handleClearAll() {
    currentInput = "0";
    formulaExpression = "";
    shouldResetDisplay = false;
}

function handleBackspace() {
    if (shouldResetDisplay) return; 

    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = "0";
    }
}

function handlePercentage() {
    currentInput = String(parseFloat(currentInput) / 100);
}
