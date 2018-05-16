/**
 * core
 */
const calculator = {
  calc: function (term1, term2, operator) {
        'use strict';
        let solution = 0;

        if(term2 === ''){
            return 'Invalid calculation';
        }

        term1 = parseFloat(term1);
        term2 = parseFloat(term2);

        switch (operator) {
            case '+':
                solution = term2 + term1;
                break;
            case '-':
                solution = term2 - term1;
                break;
            case '*':
                solution = term2 * term1;
                break;
            case '/':
                if(term1 === 0){
                    return "You've destroyed the universe, thx";
                }else{
                    solution = term2 / term1;
                }
        }

        return solution;
    }

};

/**
 * UI
 */

const calculatorUI = {
  calculator : null,
  numberButtons: null,
  operatorButtons: null,
  commandButtons: null,
  input: null,
  output: null,
  term1: "",
  term2: "",
  operator: "",

  init: function (calculator) {
    'use strict';
    this.calculator = calculator;
    this.numberButtons = document.querySelectorAll('.number');
    this.operatorButtons = document.querySelectorAll('.operator');
    this.commandButtons = document.querySelectorAll('.command');
    this.input = document.querySelector('.input');
    this.output = document.querySelector('.output');
    this.input = document.querySelector('.input');

    // Setze Welcome Nachricht
    this.initWelcomeMessage();

    // Instantiate Event Listener
    this.hideWelcomeMessage();
    this.instantiateEventsForTerm(this.numberButtons);
    this.instantiateEventForOperator(this.operatorButtons);
    this.instantiateEventForCommands(this.commandButtons);
  },

  /**
   * Stelle die Welcome-Nachricht initial dar
   */
  initWelcomeMessage: function() {
    'use strict';
    document.querySelector("#output").value = "Welcome";
  },

  /**
   * Blende die Welcome-Nachricht aus
   */
  hideWelcomeMessage: function() {
    'use strict';
    const self = this;
    document.querySelectorAll("form button").forEach(function(elem) {
      elem.addEventListener("click", function () {
        if(self.output.value === "Welcome") {
          self.output.value = "";
        }
      });
    });
  },

  /**
   * Initiate the Events
   * @param elements
   */
  instantiateEventsForTerm: function (elements) {
    'use strict';
    let self = this;

    elements.forEach((elem) => {
      elem.addEventListener('click', function (event) {
        self.setTerm(parseFloat(event.target.value));
      });
    });
  },

  instantiateEventForOperator: function (elements) {
    'use strict';
    let self = this;

    elements.forEach((elem) => {
      elem.addEventListener('click', function (event) {
        self.setOperator(event.target);
      });
    });
  },

  instantiateEventForCommands: function (elements) {
    'use strict';
    let self = this;
    elements.forEach((elem) => {
      elem.addEventListener('click', function (event) {
        if(event.target.innerHTML === 'C'){
          self.clear();
        }else if(event.target.innerHTML === '=' ){
          const result = calculator.calc(self.term1, self.term2, self.operator);
          self.clear();
          self.setTerm(result);
        }
      });
    });
  },

  setTerm: function(value){
    'use strict';
    this.term1 += value;
    this.input.value = this.term1;
  },

  setOperator: function (elem) {
    'use strict';
    if(this.operator === ''){
      this.operator = elem.value;
      this.output.value = this.term1 + " " + elem.value;
      this.term2 = this.term1;
    }else {
      this.operator = elem.value;
      this.output.value = this.output.value.substr(0, this.output.value.length - 1) + this.operator;
    }

    this.input.value = "";
    this.term1 = "";
  },

  clear: function () {
    'use strict';
    this.output.value = "";
    this.input.value = "";
    this.term1 = "";
    this.term2 = "";
    this.operator = "";
  }
};

window.addEventListener('load', function () {
    'use strict';
    calculatorUI.init(calculator);

});
