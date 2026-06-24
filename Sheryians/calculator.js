
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "0";     
let formulaExpression = "";  
let shouldResetDisplay = false;


buttons.forEach(button => {
    button.addEventListener("click", () => {
        processInput(button.textContent);
    });
});

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


function isNumber(val) {
    return !isNaN(val) && val !== " ";
}

function isOperator(val) {
    return ["+", "-", "*", "/"].includes(val);
}


function updateDisplay() {
    if (formulaExpression !== "") {
        display.textContent = formulaExpression + " " + (shouldResetDisplay ? "" : currentInput);
    } else {
        display.textContent = currentInput;
    }
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
   
    if (shouldResetDisplay && formulaExpression !== "") {
       
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


function handleEquals() {
    if (formulaExpression === "" || shouldResetDisplay) return;

    
    const finalExpression = formulaExpression + " " + currentInput;
    
    try {
        
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

    formulaExpression = ""; 
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
