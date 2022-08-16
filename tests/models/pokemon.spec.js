const { Pokemon, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Pokemon model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Pokemon.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Pokemon.create({ name: "Pikachu" });
      });
    });
  });
  // ++++++++++++++++
  describe("Creating pokemon", () => {
    // it("should return an error if the pokemon's name is not a string", async () => {
    //   let testPokemon = await Pokemon.create({
    //     name: 15,
    //     speed: 78,
    //   });
    //   expect(typeof testPokemon.name === "string").to.equal(false);
    //   // expect(typeof testPokemon.speed === "number").to.equal(true);
    // });

    it("should return the pokemon created", async () => {
      let testPokemon = await Pokemon.create({ name: "Yoshi", speed: 78 });
      expect(testPokemon.name).to.equal("Yoshi");
      expect(testPokemon.speed).to.equal("78");
    });
  });
});
