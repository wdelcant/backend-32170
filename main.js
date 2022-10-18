const fs = require('fs');
const path = require('path');

class Contenedor {
  constructor(file) {
    this.file = file;
  }

  async save(obj) {
    const data = await this.getAll();
    obj.id = data.length + 1;
    data.push(obj);
    await fs.promises.writeFile(this.file, JSON.stringify(data, null, 2));
    return obj.id;
  }

  async getById(id) {
    const data = await this.getAll();
    return data.find(aProduct => aProduct.id === id);
  }

  async getAll() {
    try {
      const contenido = await fs.promises.readFile(this.file, 'utf-8');
      return JSON.parse(contenido);
    } catch (error) {
      await fs.promises.writeFile(this.file, '[]', 'utf-8');
      return [];
    }
  }

  async deleteById(id) {
    const data = await this.getAll();
    const newData = data.filter(aProduct => aProduct.id !== id);
    await fs.promises.writeFile(this.file, JSON.stringify(newData, null, 2));
  }

  async deleteAll() {
    await fs.promises.writeFile(this.file, '[]', 'utf-8');
  }

  async getParsedFileOrCreateIfNotExists() {
    try {
      const contenido = await fs.promises.readFile(this.file, 'utf-8');
      return JSON.parse(contenido);
    } catch (error) {
      await fs.promises.writeFile(this.file, '[]', 'utf-8');
      return [];
    }
  }
}

(async () => {
  const contenedor = new Contenedor(path.resolve(__dirname, 'productos.txt'));

  await contenedor.save({
    title: 'Escuadra',
    price: 123.45,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
  });
  await contenedor.save({
    title: 'Calculadora',
    price: 234.56,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
  });
  await contenedor.save({
    title: 'Globo Terráqueo',
    price: 345.67,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
  });

  console.log(await contenedor.getAll());
  console.log(await contenedor.getById(2));

  await contenedor.deleteById(1);

  console.log(await contenedor.getAll());

  await contenedor.deleteAll();

  console.log(await contenedor.getAll());
})();
