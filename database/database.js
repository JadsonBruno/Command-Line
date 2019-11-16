const { readFile, writeFile } = require("fs");
const { promisify } = require("util");

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {
  constructor() {
    this.FILE_NAME = "./database/heros.json";
  }
  async getDataFile() {
    const file = await readFileAsync(this.FILE_NAME, "utf8");
    return JSON.parse(file.toString());
  }

  async myWriteFile(data) {
    await writeFileAsync(this.FILE_NAME, JSON.stringify(data));
    return true;
  }

  async register(hero) {
    const data = await this.getDataFile();
    const id = hero.id <= 2 ? hero.id : Date.now();
    const heroConcat = { id, ...hero };
    const finalData = [...data, heroConcat];
    const result = await this.myWriteFile(finalData);
    return result;
  }

  async showData(id) {
    const data = await this.getDataFile();
    const filterData = data.filter(item => (id ? item.id === id : true));
    return filterData;
  }

  async delete(id) {
    if (!id) return await this.myWriteFile([]);
    const data = await this.getDataFile();
    const index = data.findIndex(item => item.id === parseInt(id));
    if (index === -1) throw Error("The user doesn't exist");
    data.splice(index, 1);
    return await this.myWriteFile(data);
  }
  async update(id, changes) {
    const data = await this.getDataFile();
    const index = data.findIndex(item => item.id === parseInt(id));
    if (index === -1) throw Error("That hero doesn't exist");
    const actual = data[index];
    const updaterObject = {
      ...actual,
      ...changes
    };
    data.splice(index, 1);
    return await this.myWriteFile([...data, updaterObject]);
  }
}

module.exports = new Database();
