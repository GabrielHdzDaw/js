class Color {
    #valores = [];
    constructor(r, g, b) {
        this.values = [r, g, b];
    }

    toString() {
        return `rgb(${this.values[0]}, ${this.values[1]}, ${this.values[2]})`;
    }
}

function mostrarRojo(color) {
    console.log(color.values[0]);
}

function mostrarVerde(color) {
    console.log(color.values[1]);
}


function mostrarAzul(color) {
    console.log(color.values[2]);
}

function mostrarColor(color) {
    console.log(color.toString());
}

export default Color;
export { Color, mostrarRojo, mostrarVerde, mostrarAzul, mostrarColor };