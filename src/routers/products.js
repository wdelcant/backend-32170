const { Router } = require('express');
const ProductContenedor = require('../contenedores/ProductContenedor');

const productRouter = Router();

const productContenedor = new ProductContenedor();

productRouter.get('/:id', (request, response) => {
  const product = productContenedor.getById(request.params.id);
  if (product === null) {
    response.json({ error: 'Producto no encontrado' });
  } else {
    response.json(product);
  }
});

productRouter.get('/', (request, response) => {
  const products = productContenedor.getAll();
  response.json(products);
});

productRouter.post('/', (request, response) => {
  console.log('Crea un producto', request.body);
  const productId = productContenedor.save(request.body);
  response.json({
    ...request.body,
    id: productId,
  });
});

productRouter.put('/:id', (request, response) => {
  const product = productContenedor.updateById(request.params.id, request.body);
  if (product === null) {
    response.json({ error: 'Producto no encontrado' });
  } else {
    response.json({ message: 'Producto actualizado', product });
  }
});

productRouter.delete('/:id', (request, response) => {
  const res = productContenedor.deleteById(request.params.id);
  res === null
    ? response.json({ error: 'Producto no encontrado' })
    : response.json({ message: 'Producto eliminado', product: res });
});

module.exports = productRouter;
