import { Usuario } from './class/Usuarios.js';

const mascotas = ['Perro', 'Gato'];

const user = new Usuario(
  'Wilson',
  'Del Canto',
  [{ nombre: 'Fuego y Sangre', autor: 'George R.R. Martin.' }],
  mascotas
);

const main = () => {
  console.log(user.getFullName());
  user.addMascota('Raton');
  console.log(user.countMascotas());
  user.addBook('Juego de Tronos', 'George R.R. Martin.');
  console.log(user.getBookNames());
};
main();
