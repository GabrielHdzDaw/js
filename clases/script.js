function Libro(titulo, autor, paginas, leido){
    this.titulo = titulo;
    this.autor = autor;
    this.paginas = paginas;
    this.leido = leido;
    this.info = function(){
        return `${titulo} de ${autor}, ${paginas} páginas, ${leido ? 'ya leído' : 'no leído aún'}`;
    }
}

const libro = new Libro('El señor de los anillos', 'J.R.R. Tolkien', 1200, true);

console.log(libro.info());
