'use strict'
const display1Elm = document.querySelector('.display1Elm');
const display2Elm = document.querySelector('.display2Elm');
const tempResult = document.querySelector('.tempResult');

const operations = document.querySelectorAll('.operation');
const numbers = document.querySelectorAll('.number');
const equal = document.querySelector('.equal');
const allClear = document.querySelector('.allClear');
const clear = document.querySelector('.clear');

let display1 = '';
let display2 = '';
let result = null;
let lastOperation = '';
let haveDot = false;

numbers.forEach((num) => {
    num.addEventListener('click', (e) => {

        if (e.target.innerText === '.' && !haveDot) {
            haveDot = true
        }
        else if (e.target.innerText === '.' && haveDot) {
            return
        }
        display2 += e.target.innerText;
        display2Elm.innerText = display2;
    })
});

operations.forEach((operation) => {
    operation.addEventListener('click', (e) => {
        if (!display2) {
            return
        }
        else {
            haveDot = false
            const operationName = e.target.innerText;
            if (display1 && display2 && lastOperation) {
                mathOperation()
            }
            else {
                result = parseFloat(display2)// changing string to number
            }


            clearVar(operationName)
            lastOperation = operationName
        }
    })
})

const clearVar = (optName = "") => {
    display1 += display2 + " " + optName + " ";
    display1Elm.innerText = display1;
    display2Elm.innerText = ""
    display2 = "";
    tempResult.innerText = result
}

const mathOperation = () => {
    if (lastOperation === "X") {
        result = parseFloat(result) * parseFloat(display2)
    } else if (lastOperation === '+') {
        result = parseFloat(result) + parseFloat(display2)

    } else if (lastOperation === '-') {
        result = parseFloat(result) - parseFloat(display2)

    } else if (lastOperation === '/') {
        result = parseFloat(result) / parseFloat(display2)

    } else if (lastOperation === '%') {
        result = parseFloat(result) % parseFloat(display2)
    }
};
equal.addEventListener('click', (e) => {
    if (!display1 || !display2) return
    mathOperation();
    clearVar();
    display2Elm.innerText = result;
    tempResult.innerText = "";
    display2 = ""
    display1 = '';
});

allClear.addEventListener('click', (e) => {
    display1Elm.innerHTML = '0';
    display2Elm.innerHTML = '0.00';
    display1 = "";
    display2 = "";
    result = "";
    tempResult.innerText = "";
})

clear.addEventListener("click", (e) => {
    display2Elm.innerHTML = "";
    display2 = "";
})

window.addEventListener('keydown', (e) => {

    if (
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '.'
    ) {
        clickNumElm(e.key)
    }
    else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
        clickOptElm(e.key)
    }
    else if (e.key === '*') {
        clickOptElm('X')
    }
    else if (e.key === "Enter" || e.key === "=") {
        equal.click()
    }
    else if (e.key === 'Escape') {
        allClear.click()
    }
    else if (e.key === 'Backspace') {
        clickBack()
    }
})
const clickBack = () => {
    if (display2Elm.innerText !== "0,00") {
        display2 = display2.toString().slice(0, -1)
        display2Elm.innerText = display2
    }
}

const clickNumElm = (key) => {
    numbers.forEach((btn) => {
        if (btn.innerText === key) {
            btn.click()
        }
    })
}
const clickOptElm = (key) => {
    operations.forEach((btn) => {
        if (btn.innerText === key)
            btn.click();
    })
}

