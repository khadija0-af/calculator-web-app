const display = document.getElementById('calc-display');

/**
 * Appends a value to the calculator display.
 * @param {string} value - The value to append.
 */
function appendToDisplay(value) {
    // Prevent multiple operators in a row
    const lastChar = display.value.slice(-1);
    const operators = ['+', '-', '*', '/'];
    
    if (operators.includes(value) && operators.includes(lastChar)) {
        display.value = display.value.slice(0, -1) + value;
        return;
    }

    // Default behavior
    display.value += value;
    scrollToEnd();
}

/**
 * Clears the calculator display.
 */
function clearDisplay() {
    display.value = '';
}

/**
 * Deletes the last character from the display.
 */
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

/**
 * Performs the calculation based on the current display value.
 */
function calculate() {
    try {
        // We use Function constructor as a safer alternative to eval for simple math
        // This is a basic calculator, so for complex apps, a custom math parser would be better.
        if (display.value.trim() === '') return;
        
        // Sanitize input: only numbers and basic operators allowed
        const sanitizedInput = display.value.replace(/[^0-9+\-*/.]/g, '');
        
        const result = new Function('return ' + sanitizedInput)();
        
        // Handle infinity or non-numbers
        if (!isFinite(result)) {
            display.value = "Error";
            return;
        }

        // Format result (limit decimal places)
        display.value = parseFloat(result.toFixed(8)).toString();
    } catch (error) {
        display.value = 'Error';
    }
    scrollToEnd();
}

/**
 * Keeps the cursor/view at the end of the input for long expressions.
 */
function scrollToEnd() {
    display.scrollLeft = display.scrollWidth;
}

// Add keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    const allowedKeys = '0123456789+-*/.';

    if (allowedKeys.includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});
