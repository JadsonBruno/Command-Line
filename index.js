const Commander = require("commander");
const Database = require("./database");
const Hero = require("./Hero");

async function main() {
  Commander.version("v1")
    .option("-n, --name [value]", "Hero Name")
    .option("-p, --power [value]", "Hero Power")
    .option("-i, --id [value]", "Hero Id")
    //CRUD
    .option("-r, --register", "Register a hero")
    .option("-s, --show", "Show heros registered")
    .option("-d, --delete", "Delete a hero by id")
    .option("-u, --update [value]", "Update a hero by id")
    .parse(process.argv);

  const hero = new Hero(Commander);
  try {
    /**
     * node cli.js --register params
     * node cli.js -c -n Hulk -p Strong
     */
    if (Commander.register) {
      delete hero.id;
      const result = await Database.register(hero);
      if (!result) {
        console.error("Something went wrong, Hero has not been registered!");
        return;
      }
      console.log("Hero registered!");
    }
    if (Commander.show) {
      const result = await Database.getDataFile();
      console.log(result);
      return;
    }
    if (Commander.delete) {
      const result = await Database.delete(hero.id);
      if (!result) {
        console.error("Something went wrong, Hero has not been deleted!");
        return;
      }
      console.log("Hero deleted!");
    }
    if (Commander.update) {
      const id = parseInt(Commander.update);
      const data = JSON.stringify(hero);
      const updateHero = JSON.parse(data);
      const result = await Database.update(id, updateHero);
      if (!result) {
        console.error("Something went wrong, Hero has not been updated!");
        return;
      }
      console.log("Hero updated!");
    }
  } catch (error) {
    console.error(error);
  }
}

main();
