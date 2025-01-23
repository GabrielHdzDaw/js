const botonSumar = document.getElementById("sumar");
const botonRestar = document.getElementById("restar");
const botonMultiplicar = document.getElementById("multiplicar");
const botonElevar = document.getElementById("elevar");



const elementoRes = document.getElementById("res");
var valorNum1 = parseFloat(document.getElementById("num1").value);
var valorNum2 = parseFloat(document.getElementById("num2").value);

function updateValues(){
    valorNum1 = parseFloat(document.getElementById("num1").value);
    valorNum2 = parseFloat(document.getElementById("num2").value);
}

botonSumar.addEventListener('click', () => {
    updateValues()
    elementoRes.value = operacion("+", valorNum1, valorNum2);
})
botonRestar.addEventListener('click', () => {
    updateValues()
    elementoRes.value = operacion("-", valorNum1, valorNum2);
})
botonMultiplicar.addEventListener('click', () => {
    updateValues()
    elementoRes.value = operacion("*", valorNum1, valorNum2);
})
botonElevar.addEventListener('click', () => {
    updateValues()
    elementoRes.value = operacion("^", valorNum1, valorNum2);
})



function operacion(operador, num1, num2){
    
    let res = 0;
    switch (operador) {
        case "+":
            res = num1 + num2;
            break;
        case "-":
            res = num1 - num2;
            break;
        case "*":
            res = num1 * num2;
            break;
        case "^":
            res = Math.pow(num1, num2);
            break;
        default:
            res = 0;
            break;
    }
    return res;
    
}