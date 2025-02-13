class Color {
    #variablePrivada;
    variablePublica;

    #values;

    constructor(r, g, b) {
        this.#values = [r, g, b];
    }

    get red() {
        return this.#values[0];
    }

    set red(value) {
        this.#values[0] = value;
    }

    static esValido(r, g, b) {
        return r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255;
    }


    toString() {
        return this.#values.join(", ");
    }
}

const rojo = new Color(255, 0, 0);
console.log(Color.esValido(254, 1245, 23))

class ColorConTransparencia extends Color {
    #alpha;
    constructor(r, g, b, a) {
        super(r, g, b)
        this.#alpha = a;
    }

    get alpha() {
        return this.#alpha;
    }

    set alpha(alpha) {
        if (valor < 0 || valor > 1) {
            throw new RangeError("El valor de alpha debe estar entre 0 y 1");
        }
        this.#alpha = alpha;
    }
}

const colorTransparente = new ColorConTransparencia(255, 0, 0, 1);
