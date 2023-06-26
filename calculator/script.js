class Calculator{
    // doesn't need data type
    // members used here are prevOperandTextElement, currentOperandTextElement, prevOperand, currentOperand, 
    constructor(prevOperandTextElement, currentOperandTextElement){
        this.prevOperandTextElement = prevOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }


    clear(){ // step 7
        this.currentOperand = "";
        this.prevOperand = "";
        this.operation = undefined;
    }
    delete(){ // step 6
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }
    compute(){ // step 5
        let computation;
        const prev = parseFloat(this.prevOperand);
        const current = parseFloat(this.currentOperand);
        const op = this.operation;
        if(op == "+"){
            computation = prev+current;
        }
        else if(op == "-"){
            computation = prev-current;
        }
        else if(op == "*"){
            computation = prev*current;
        }else if(op == "÷"){
            computation = prev/current;
        }

        this.currentOperand = computation;
        this.prevOperand = "";
        this.operation = undefined;
    }

    chooseOperation(operation){ // step 4
        if(this.currentOperand==="") return;
        if(this.prevOperand !==""){
            this.compute();
        }
        this.operation = operation;
        this.prevOperand = this.currentOperand;
        this.currentOperand = "";
    }
    
    getDisplayNumber(number){ //using for commas in currNumber step 3
        const stringNumber = number.toString();
        const Intdigit = parseFloat(stringNumber.split(".")[0]) ;
        const DecimalDigit = stringNumber.split(".")[1];
        let IntegerDisplay;
        if(isNaN(Intdigit)) IntegerDisplay = "";
        else IntegerDisplay = Intdigit.toLocaleString("en", {maximumFractionDigits:0});
        if(DecimalDigit!=null){
            return `${IntegerDisplay}.${DecimalDigit}`;
        }
        else{
            return IntegerDisplay;
        }
    }
    appendNumber(number){ // step 1
        if(number == "." && this.currentOperand.includes(".")) return;

        this.currentOperand = this.currentOperand.toString()+number.toString();
    }

    updateDisplay(){ // step 2
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
            this.prevOperandTextElement.innerText = this.getDisplayNumber(this.prevOperand) + " " + this.operation;
        }
        else{
            this.prevOperandTextElement.innerText = "";
        }

    }

}


const numberButtons = document.querySelectorAll("[data-number]");
const operationbuttons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const prevOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

// making an object calculator having 2 arguments
const calculator = new Calculator(
    prevOperandTextElement,
    currentOperandTextElement
);
numberButtons.forEach(button=>{
    button.addEventListener("click", ()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})
operationbuttons.forEach(button =>{
    button.addEventListener("click", ()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener("click", ()=>{

    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener("click", ()=>{
    calculator.clear();
    calculator.updateDisplay();
})
deleteButton.addEventListener("click",()=>{
    calculator.delete();
    calculator.updateDisplay();
})