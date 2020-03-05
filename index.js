const calculator = {
  displayValue: '0',
  operators: ['+', '-', '/', '%', '*', '^', 'sqrt'],
  currentOperator: null,

  inputDigit(digit) {
    const { displayValue } = this;
    this.displayValue = displayValue === '0'
      ? digit
      : displayValue + digit;
  },

  inputDot() {
    const { displayValue, currentOperator } = this;

    const lastNumber = displayValue.split(currentOperator).reverse()[0];

    if (!lastNumber.includes('.')) {
      if (displayValue.slice(-1).match(/\d$/g)) {
        this.displayValue += '.'
      } else {
        this.displayValue += '0.'
      }
    }
  },

  handleOperator(operator) {
    const { displayValue, operators } = this;

    if (!operators.includes(displayValue.slice(-1))) {
      if (displayValue.slice(-1).match(/\.$/g)) {
        this.displayValue = displayValue.slice(0, -1) + operator;
      } else {
        this.displayValue += operator;
      }
      this.currentOperator = operator;
    } else {
      this.displayValue = displayValue.slice(0, -1) + operator;
    }
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

  calculateResult() {
    const { displayValue } = this;
    this.displayValue = String(eval(displayValue));
  }
};

const keys = document.querySelector('.calculator-keys');

keys.addEventListener('click', (event) => {
  const { target } = event;

  if (target.classList.contains('operator')) {
    calculator.handleOperator(target.value);
  } else if (target.classList.contains('decimal')) {
    calculator.inputDot();
  } else if (target.classList.contains('all-clear')) {
    calculator.resetCalculator (target.value);
  } else if (target.classList.contains('delete')) {
    calculator.deleteValue(target.value);
  } else if (target.classList.contains('digit')) {
    calculator.inputDigit(target.value);
  } else if (target.classList.contains('equal-sign')) {
    calculator.calculateResult();
  }

  console.log(calculator);
  calculator.updateDisplay();
});
