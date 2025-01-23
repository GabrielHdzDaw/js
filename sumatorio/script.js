const botonAnadir = document.querySelector("#anadir");
const botonCalcular = document.querySelector("#calcular");
const inputResultado = document.querySelector("#res");

botonAnadir.addEventListener('click', () => {
    const ultimoInput = document.querySelector(".sumatorio:last-child");
    const nuevoInput = document.createElement('input');
    nuevoInput.type = "number";
    nuevoInput.className = "sumatorio";

    ultimoInput.insertAdjacentElement('afterend', nuevoInput);
});

botonAnadir.addEventListener('click', () => {
    let numeros = document.querySelectorAll(".sumatorio");
    // let suma = 0;
    // numeros.forEach(numero => {
    //     suma += parseFloat(numero.value);
    // });
    // inputResultado.value = suma;
    // suma = 0;  
    const resultado = Array.from(numeros).reduce((suma, numero) => {
        return suma + parseFloat(numero.value);
    })  
    inputResultado.value = resultado;
})