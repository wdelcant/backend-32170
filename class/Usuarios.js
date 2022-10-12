export class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }
  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }
  addMascota(newMascota) {
    this.mascotas = [...this.mascotas, newMascota];
  }
  countMascotas() {
    return this.mascotas.length;
  }
  addBook(nombre, autor) {
    this.libros = [...this.libros, { nombre: nombre, autor: autor }];
  }
  getBookNames() {
    return this.libros.map(res => res.nombre);
  }
}
