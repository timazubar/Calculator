const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,

  inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = this;
    if (waitingForSecondOperand === true) {
      this.displayValue = digit;
      this.waitingForSecondOperand = false;
    }
    else {
      this.displayValue = displayValue === '0'
        ? digit 
        : displayValue + digit;
    }
  },
  inputDecimal(dot) {
    if (this.waitingForSecondOperand === true) return;
    if (!this.displayValue.includes(dot)) {
      this.displayValue += dot;
    }
  },
  handleOperator(nextOperator) {
    const {firstOperand, displayValue, operator} = this;
    const inputValue = parseFloat(displayValue);
  
    if (operator && this.waitingForSecondOperand) {
      this.operator = nextOperator;
      return;
    }
      
    if (firstOperand == null) {
      this.firstOperand = inputValue;
    } else if (operator) {
      const result = performCalculation[operator](firstOperand, inputValue);
      this.displayValue = String(result);
      this.firstOperand = result;
    }
  
    this.waitingForSecondOperand = true;
    this.operator = nextOperator;
  },
  resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
  },
  updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
  },
  deleteValue() {
    const input = document.querySelector('.calculator-screen');
    calculator.displayValue = input.value.slice(0,-1);
  },
  findSQRT() {
    const input = document.querySelector('.calculator-screen');
    calculator.displayValue = Math.sqrt(input.value);
  },
};

const performCalculation = {
  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  '=': (_, secondOperand) => secondOperand,
  "^": (firstOperand, secondOperand) => Math.pow(firstOperand, secondOperand),
  "sqrt": (firstOperand) => Math.sqrt(firstOperand),
  "%": (firstOperand, secondOperand) => (firstOperand)/100 * secondOperand,
}; 

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
  const { target } = event;

  if (target.classList.contains('operator')) {
    calculator.handleOperator(target.value);
  } else if (target.classList.contains('decimal')) {
    calculator.inputDecimal(target.value);
  } else if (target.classList.contains('all-clear')) {
    calculator.resetCalculator (target.value);
  } else if (target.classList.contains('delete')) {
    calculator.deleteValue(target.value);
    calculator.updateDisplay();
  } else if (target.classList.contains('digit')) {
    calculator.inputDigit(target.value);
  } else if (target.classList.contains('sqrt')) {
    calculator.findSQRT(target.value);
  }
  console.log(calculator);
  calculator.updateDisplay();
});
