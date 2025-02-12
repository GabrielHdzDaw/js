
// Crea un array llamado "biblioteca" que guardará todos los libros de la biblioteca. A continuación, crea un constructor 
// para Libro (con los parámetros "titulo", "autor", "páginas" y "leído"). Ahora, crea una función llamada "añadirLibroABiblioteca" 
// que construya y guarde un libro en la biblioteca al ser invocada.
// Escribe ahora un método llamado "mostrarLibros" que recorra todos los libros en la "biblioteca" y muestre su contenido en una 
// tabla HTML creada dinámicamente (utilizando un <template> para añadir una nueva fila).
// Añade ahora un botón llamado "Añadir Libro". Usando un <dialog> que contenga un <form>, llama la función "showModal" del 
// diálogo para mostrar un formulario de datos con los que añadir un nuevo libro. Para procesar estos datos, usa un FormData 
// (usa el constructor de FormData, pasándole el formulario como parámetro al construirlo, y usa "get()" para acceder a cada uno de los campos del formulario).

// Añade un botón a cada libro para eliminarlo. Haz que el listado de libros se actualice automáticamente tras borrar un libro.
// Añade un botón a cada libro para alternar su estado entre leído y no leído. Haz que el listado de libros se actualice automáticamente tras cambiar el estado.



function Libro(titulo, autor, pags, leido) {
    this.titulo = titulo;
    this.autor = autor;
    this.pags = pags;
    this.leido = leido;
    this.info = function () {
        return `${titulo} de ${autor}, ${paginas} páginas, ${leido ? 'ya leído' : 'no leído aún'}`;
    }
}

function LibroTraducido(titulo, autor, pags, leido, idioma){
    this.titulo = titulo;
    this.autor = autor;
    this.pags = pags;
    this.leido = leido;
    this.idioma = idioma;
}

Object.setPrototypeOf(LibroTraducido.prototype, Libro.prototype);

const libroT = new LibroTraducido('El señor de los anillos', 'J.R.R. Tolkien', 1200, false, 'inglés');

const libro = new Libro('El señor de los anillos', 'J.R.R. Tolkien', 1200, false);

console.log(Libro.prototype === Object.getPrototypeOf(libro));

console.log(libro.valueOf());

console.log(libro.hasownProperty("valueOf"));

console.log(libro.prototype)

const biblioteca = []

function anadirLibroABiblioteca() {

}

console.log(libro.info());
