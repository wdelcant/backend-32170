const products = [
  {
    id: 1,
    title: 'Pizza',
    price: 4500,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/food-restaurant-1/64/pizza-italian-food-restaurant-meal-512.png',
  },
  {
    id: 2,
    title: 'Hamburguesa',
    price: 3000,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/food-restaurant-1/64/hamburger-burger-food-restaurant-meal-512.png',
  },
  {
    id: 3,
    title: 'Hot Dog',
    price: 2000,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/food-restaurant-1/64/hot-dog-food-restaurant-meal-512.png',
  },
];

class ProductContenedor {
  constructor() {
    this.products = products;
  }

  save(products) {
    product.id = this.getId();
    this.products.push(products);
    return product.id;
  }

  getById(id) {
    const product = this.products.find(product => product.id === parseInt(id));
    if (!product) return null;
    return product;
  }

  getAll() {
    return this.products;
  }

  deleteById(id) {
    const product = this.getById(id);
    if (!product) return null;
    this.products = this.products.filter(
      product => product.id !== parseInt(id)
    );
    return product;
  }

  deleteAll() {
    this.products = [];
    return;
  }

  updateById(id, product) {
    const productIndex = this.products.findIndex(
      item => item.id === parseInt(id)
    );
    this.products.splice(productIndex, 1, { id: parseInt(id), ...product });
    return;
  }

  getId() {
    const lastProduct = this.products[this.products.length - 1];
    const lastId = lastProduct.id;
    return lastId + 1;
  }
}

module.exports = ProductContenedor;
