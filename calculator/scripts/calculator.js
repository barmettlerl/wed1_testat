/**
 * core
 */
let calculator = {
    numberButtons: null,
    operators: null,
    commands: null,
    input: null,
    output: null,
    operator: "",
    term1: "",
    term2: "",

    setTerm: function(value){
        this.term1 += value;
        this.input.value = this.term1;
    },

    setOperator: function (elem) {

        if(this.operator === ''){
            this.operator = elem.value;
            this.output.value = this.term1 + " " + elem.value;
            this.term2 = this.term1;
        }else {
            this.operators = elem.value;
            this.output.value = this.output.value.substr(0, this.output.value.length - 1) + this.operators;
        }
        this.input.value = "";
        this.term1 = "";
    },

    clear: function () {
        this.operator = '';
        this.term1 = "";
        this.input.value = "";
        this.term2 = "";
        this.output.value = "";
    },

    init: function () {

        this.numberButtons = document.querySelectorAll('.number');
        this.operators = document.querySelectorAll('.operator');
        this.commands = document.querySelectorAll('.command');
        this.input = document.querySelector('.input');
        this.output = document.querySelector('.output');
        this.input = document.querySelector('.input');

        // Setze Welcome Nachricht
        this.initWelcomeMessage();

        // Instantiate Event Listener
        this.hideWelcomeMessage();
        this.instantiateEventsForTerm(this.numberButtons);
        this.instantiateEventForOperator(this.operators);
        this.instantiateEventForCommands(this.commands);
    },

    /**
     * Stelle die Welcome-Nachricht initial dar
     */
    initWelcomeMessage: function() {
        document.querySelector("#output").value = "Welcome";
    },

    /**
     * Blende die Welcome-Nachricht aus
     */
    hideWelcomeMessage: function() {
        document.querySelectorAll("form button").forEach(function(elem) {
            elem.addEventListener("click", function () {
                if(document.querySelector("#output").value === "Welcome") {
                    document.querySelector("#output").value = "";
                }
            });
        });
    },

    /**
     * Blabla
     * @param elements
     */
    instantiateEventsForTerm: function (elements) {
        let self = this;

        elements.forEach((elem) => {
            elem.addEventListener('click', function (event) {
                self.setTerm(parseFloat(event.target.value));
            })
        })
    },

    instantiateEventForOperator: function (elements) {
        let self = this;

        elements.forEach((elem) => {
            elem.addEventListener('click', function (event) {
                self.setOperator(event.target);
            })
        })
    },

    instantiateEventForCommands: function (elements) {
        let self = this;

        elements.forEach((elem) => {
            elem.addEventListener('click', function (event) {
                console.log(event.target.innerHTML);
                if(event.target.innerHTML === 'C'){
                    self.clear();
                }else if(event.target.innerHTML === '=' ){
                    self.calculate(self.term1, self.term2, self.operator);
                }
            })
        })
    },

    calculate: function (term1, term2, operator) {
        let solution = 0;

        if(term2 === ''){
            this.output.value = 'Invalid calculation';
            return;
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
                    this.output.value = "You've destroyed the universe, thx";
                    return;
                }else{
                    solution = term2 / term1;
                }
        }

        this.clear();
        this.setTerm(solution);
    }
}


=======
}

/**
 * UI
 */
>>>>>>> 45270dd23351aa5013882d50c296ea7c86e2d0db
window.addEventListener('load', function () {
    calculator.init();
});
