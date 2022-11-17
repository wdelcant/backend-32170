const express = require('express');
const productRouter = require('./routers/products');
const logRequestInfo = require('./middlewares/logRequestInfo');
const app = express();
const PORT = 8080;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', logRequestInfo, productRouter);

let vista = Boolean(true);

app.get('/', (req, res) => {
  vista = true;
  res.render('index', { vista });
});

app.post('/', (req, res) => {
  vista = false;
  res.render('index', { vista });
});


app.listen(PORT, () =>
  console.log(`Servidor http escuchando en el puerto http://localhost:${PORT}`)
);

app.on('error', error => {
  console.log('error en el servidor:', error);
});
