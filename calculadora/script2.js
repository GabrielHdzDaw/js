// let botonSumar = document.getElementById("sumar");
// let botonRestar = document.getElementById("restar");
// let botonMultiplicar = document.getElementById("multiplicar");
// let botonElevar = document.getElementById("elevar");


// const sumar = (num1, num2) => {
//     return num1 + num2
// }

// const restar = (num1, num2) => {
//     return num1 - num2
// }

// const multiplicar = (num1, num2) => {
//     return num1 * num2
// }

// const elevar = (num1, num2) => {
//     return Math.pow(num1, num2)
// }


document.getElementById("sumar").addEventListener('click', () => {
    operar((num1, num2) => {
        return num1 + num2
    })
})
document.getElementById("restar").addEventListener('click', () => {
    operar((num1, num2) => {
        return num1 - num2
    })
})
document.getElementById("multiplicar").addEventListener('click', () => {
    operar((num1, num2) => {
        return num1 * num2
    })
})
document.getElementById("elevar").addEventListener('click', () => {
    operar((num1, num2) => {
        return Math.pow(num1, num2)
    })
})

function operar(operacion) {
    let num1 = parseFloat(document.getElementById("num1").value);
    let num2 = parseFloat(document.getElementById("num2").value);
    let res = document.getElementById("res");
    res.value = operacion(num1, num2);
}