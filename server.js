const { getAll, getRandom } = require('./contenedor.js');
const express = require('express');
const app = express();
const PORT = 8080;

app.get('/productos', async (solicitud, respuesta) => {
  const resp = await getAll();
  respuesta.send(resp);
});
server.on('Error', error => console.log(error));

app.get('/productoRandom', async (solicitud, respuesta) => {
  const resp = await getRandom();
  respuesta.send(resp);
});

app.listen(PORT, () => {
  console.log('Server escuchando el puerto 8080');
});
