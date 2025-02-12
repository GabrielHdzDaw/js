// #region Enunciado

/* Crea un array llamado "biblioteca" que guardará todos los libros de la biblioteca. A continuación, crea un constructor
para Libro (con los parámetros "titulo", "autor", "páginas" y "leído"). Ahora, crea una función llamada "añadirLibroABiblioteca"
que construya y guarde un libro en la biblioteca al ser invocada.
Escribe ahora un método llamado "mostrarLibros" que recorra todos los libros en la "biblioteca" y muestre su contenido en una
tabla HTML creada dinámicamente (utilizando un <template> para añadir una nueva fila).
Añade ahora un botón llamado "Añadir Libro". Usando un <dialog> que contenga un <form>, llama la función "showModal" del
diálogo para mostrar un formulario de datos con los que añadir un nuevo libro. Para procesar estos datos, usa un FormData
(usa el constructor de FormData, pasándole el formulario como parámetro al construirlo, y usa "get()" para acceder a cada uno de los campos del formulario).

Añade un botón a cada libro para eliminarlo. Haz que el listado de libros se actualice automáticamente tras borrar un libro.
Añade un botón a cada libro para alternar su estado entre leído y no leído. Haz que el listado de libros se actualice automáticamente tras cambiar el estado.*/

// #endregion

// #region Constructor Libro
function Libro(titulo, autor, pags, leido) {
  this.titulo = titulo;
  this.autor = autor;
  this.pags = pags;
  this.leido = leido;
  this.info = function () {
    return `${titulo} de ${autor}, ${paginas} páginas, ${
      leido ? "ya leído" : "no leído aún"
    }`;
  };
}
// #endregion
const biblioteca = [];

// #region Constantes

const dialog = document.querySelector("dialog");
const form = dialog.querySelector("form");
const btnAddLibro = document.querySelector("#addLibro");
const btnMostrarLibros = document.querySelector("#mostrarLibros");
const template = document.querySelector("template");

// #endregion

// #region Eventos
btnMostrarLibros.addEventListener("click", () => {
  mostrarLibros();
});

btnAddLibro.addEventListener("click", () => {
  dialog.showModal();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  anadirLibroABiblioteca();
});
// #endregion

// #region Funciones
function anadirLibroABiblioteca() {
  const formData = new FormData(form);
  const titulo = formData.get("titulo");
  const autor = formData.get("autor");
  const paginas = formData.get("paginas");
  const leido = formData.get("leido");

  const libro = new Libro(titulo, autor, paginas, leido);
  //Podríamos usar biblioteca.append(libro) para añadir el libro al final del array, modificando el orden en el que se ven los libros en la tabla
  biblioteca.push(libro);
  form.reset();
  dialog.close();
}

function mostrarLibros() {
  const table = document.querySelector("table");

  // Debemos eliminar el tbody actual antes de añadir uno nuevo
  const tbodyActual = table.querySelector("tbody");
  if (tbodyActual) tbodyActual.remove();

  const templateClone = template.content.cloneNode(true);
  const tbody = templateClone.querySelector("tbody");
  tbody.innerHTML = "";

  biblioteca.forEach((libro, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${libro.titulo}</td>
        <td>${libro.autor}</td>
        <td>${libro.pags}</td>
        <td>${libro.leido ? "Sí" : "No"}</td>
        <td><button class="eliminar" data-index="${index}">Eliminar</button></td>
        <td><button class="marcar-leido" data-index="${index}">${
      libro.leido ? "Marcar como pendiente" : "Marcar como leído"
    }</button></td>
      `;

    tbody.appendChild(tr);

    tr.querySelector(".eliminar").addEventListener("click", () => {
      biblioteca.splice(index, 1);
      mostrarLibros();
    });

    tr.querySelector(".marcar-leido").addEventListener("click", () => {
      biblioteca[index].leido = !biblioteca[index].leido;
      mostrarLibros();
    });
  });

  table.appendChild(tbody);
}

// #endregion
