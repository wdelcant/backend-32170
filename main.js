const fs = require('fs');
const path = require('path');

class Contenedor {
  constructor(filename) {
    this.filename = filename;
  }

  async save(element) {
    try {
      const parsedFile = await this.getParsedFileOrCreateIfNotExists();

      element.id = parseInt(Math.random()) * 50;
      parsedFile.push(element);

      await fs.promises.writeFile(
        this.filename,
        JSON.stringify(parsedFile),
        'utf-8'
      );

      return element.id;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      file = await fs.promises.readFile(this.filename, 'utf-8');
      const parsedFile = JSON.parse(file);
      const element = parsedFile.find(el => el.id === id);

      if (!element) throw new Error(`Element with ID ${id} doesn't exist`);

      const { title, price, thumbnail } = el;
      return { title, price, thumbnail };
    } catch (error) {
      console.error(error);
    }
  }

  async getAll() {
    try {
      const file = await fs.promises.readFile(this.filename, 'utf-8');
      const parsedFile = JSON.parse(file);

      return parsedFile.map(el => {
        const { title, price, thumbnail } = el;
        return { title, price, thumbnail };
      });
    } catch (error) {
      console.error(error);
    }
  }

  async deleteById(id) {
    try {
      const file = await fs.promises.readFile(this.filename, 'utf-8');
      const parsedFile = JSON.parse(file);
      const element = parsedFile.find(el => el.id === id);

      if (!element) throw new Error(`Element with ID ${id} doesn't exist`);

      const filteredArray = parsedFile.filter(el => el.id !== id); //
      await fs.promises.writeFile(this.filename, JSON.stringify(filteredArray));
    } catch (error) {
      console.error(error);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.filename, JSON.stringify('[]'));
    } catch (error) {
      console.error(error);
    }
  }

  async getParsedFileOrCreateIfNotExists() {
    let file;

    try {
      file = await fs.promises.readFile(this.filename, 'utf-8');
      return JSON.parse(file);
    } catch (error) {
      if (error.code === 'ENOENT') {
        let emptyArray = [];
        await fs.promises.writeFile(this.filename, JSON.stringify(emptyArray));
        return emptyArray;
      } else {
        console.error(error);
      }
    }
  }
}

(async () => {
  const a = new Contenedor(path.join(__dirname, '..', 'temp', 'products.txt'));

  const indexElement1 = await a.save({
    //producto 1
    title: 'Escuadra',
    price: 123.45,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
  });

  const indexElement2 = await a.save({
    title: 'Calculadora',
    price: 234.56,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
  });

  const indexElement3 = await a.save({
    title: 'Globo Terráqueo',
    price: 345.67,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
  });

  console.log(
    `First: ${indexElement1}, second: ${indexElement2}, third: ${indexElement3}`
  );

  await a.deleteById(indexElement2);

  const updatedList = await a.getAll();

  console.log(updatedList);
  console.log(updatedList.length);
})();
