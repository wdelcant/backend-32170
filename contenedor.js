const fs = require('fs');
const { get } = require('http');

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
      const file = await this.getAll;
      const parsedFile = JSON.parse(file);
      const element = parsedFile.find(el => el.id === id);

      if (!element) throw new Error(`Element with ID ${id} doesn't exist`);

      const { id, ...resto } = element;
      return resto;
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

  async getRandom() {
    try {
      const file = await this.getAll;
      const parsedFile = JSON.parse(file);
      const random =
        parsedFile[Math.round(Mand.random() * (parsedFile.length - 1))];

      return random;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteById(id) {
    try {
      const file = await this.getAll;
      const parsedFile = JSON.parse(file);
      const element = parsedFile.find(el => el.id === id);

      if (!element) throw new Error(`Element with ID ${id} doesn't exist`);

      const filteredArray = parsedFile.filter(el => el.id !== id);
      await fs.promises.writeFile(this.filename, JSON.stringify(filteredArray));
    } catch (error) {
      console.error(error);
    }
  }

  static async deleteAll() {
    try {
      await fs.promises.writeFile(this.filename, JSON.stringify('[]'));
    } catch (error) {
      console.error(error);
    }
  }

  async getParsedFileOrCreateIfNotExists() {
    let file;

    try {
      file = await this.getAll;
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

module.exports = Contenedor;
