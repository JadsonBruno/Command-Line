const { deepEqual, ok } = require("assert");

const DEFAULT_REGISTER_ITEM = {
  name: "Flash",
  power: "Speed",
  id: 1
};

const DEFAULT_UPDATE_ITEM = {
  name: "Green Lantern",
  power: "Ring energy",
  id: 2
};

const database = require("./database/database");

describe("Hero manipulation testing suite", () => {
  before(async () => {
    await database.register(DEFAULT_REGISTER_ITEM);
    await database.register(DEFAULT_UPDATE_ITEM);
  });

  it("Should search a hero using file", async () => {
    const expected = DEFAULT_REGISTER_ITEM;
    const [result] = await database.showData(expected.id);
    deepEqual(result, expected);
  });

  it("Should register a hero using files", async () => {
    const expected = DEFAULT_REGISTER_ITEM;
    const result = await database.register(DEFAULT_REGISTER_ITEM);
    const [actual] = await database.showData(DEFAULT_REGISTER_ITEM.id);

    deepEqual(actual, expected);
  });

  it("Should remove a hero by id", async () => {
    const expected = true;
    const result = await database.delete(DEFAULT_REGISTER_ITEM.id);
    deepEqual(result, expected);
  });

  it("Should update a hero by id", async () => {
    const expected = {
      ...DEFAULT_UPDATE_ITEM,
      name: "Batman",
      power: "Money"
    };
    const newData = {
      name: "Batman",
      power: "Money"
    };
    await database.update(DEFAULT_UPDATE_ITEM.id, newData);
    const [result] = await database.showData(DEFAULT_UPDATE_ITEM.id);
    deepEqual(result, expected);
  });
});
