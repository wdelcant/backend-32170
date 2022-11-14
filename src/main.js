const express = require('express');
const productRouter = require('./routers/products.js ');
const logRequestInfo = require('./middlewares/logRequestInfo');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static('public'));

app.use('/api/products', logRequestInfo, productRouter);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () =>
  console.log(`App listening on http://localhost:${port}!`)
);

app.on('error', error => {
  console.log('Server error', error);
});
