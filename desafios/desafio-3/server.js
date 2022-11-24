const Contenedor = require('./contenedor.js');
const express = require('express');
const app = express();
const PORT = 8080;

app.get('/productos', async (solicitud, respuesta) => {
  const cont = new Contenedor('productos.txt');
  const resp = await cont.getAll();
  respuesta.send(resp);
});

app.get('/productoRandom', async (solicitud, respuesta) => {
  const cont = new Contenedor('productos.txt');
  const resp = await cont.getRandom();
  respuesta.send(resp);
});

const server = app.listen(PORT, () => {
  console.log('Server escuchando el puerto 8080');
});
server.on('Error', error => console.log(error));
