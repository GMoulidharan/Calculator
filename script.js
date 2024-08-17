function Solve(val) {
    var v = document.getElementById('res');
    v.value += val;
 }

function Result(){
    var input = document.getElementById('res').value;

    //replace x with '*' and removing space in the input
    input = input.replace(/x/g, '*').replace(/\s+/g, '');

    try {
        var result = calculate(input);
        document.getElementById('res').value = result;
     } catch (error) {
        document.getElementById('res').value = 'Error';
     }
}

function calculate(expression){
    let operators = [];
    let operands = [];
    let num ='';

    for (let index = 0; index < expression.length; index++) {
        let char = expression[index];
        
        if(isDigit(char) || char === '.'){
            num +=char;
        }else if(isOperator(char)){
            operands.push(parseFloat(num));
            operators.push(char);
            num ='';
        }
    }
    operands.push(parseFloat(num));

    //multiplication and division First

    for (let index = 0; index < operators.length; index++) {
            if(operators[index] === '*' || operators[index] === '/'){
                let result = operate(operands[index] ,operands[index+1],operators[index]);
                operands.splice(index, 2, result);
                operators.splice(index, 1);
                index--;
            }
    }

    //Addition and subraction

    let result = operands[0];
    for (let index = 0; index < operators.length; index++) {
        result = operate(result,operands[index+1],operators[index]);        
    }
    return result;

}

function isDigit(char){
    return /\d/.test(char);
}

function isOperator(char){
    return['+','-','*','/','%'].includes(char);
}

function operate(a,b,operator){
    switch (operator) {
        case '+':
            return a+b;
        
        case '-':
            return a-b;
            
        case '*':
            return a*b;
            
        case '/':
            return a/b;
             
        case '%'://Modulo operation
            return b%a;
              
        default:
            throw new Error("Invalid operator");
    }
}

function Clear() {
    var inp = document.getElementById('res');
    inp.value = '';
 }
 function Back() {
    var ev = document.getElementById('res');
    ev.value = ev.value.slice(0, -1);
 }