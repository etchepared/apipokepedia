/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Pokemon, conn } = require("../../src/db.js");

const agent = session(app);
const pokemon = {
  name: "Pikachu",
};

describe("Pokemon routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
  );

  describe("GET /pokemons", () => {
    it("should get 200", () => agent.get("/pokemons").expect(200));
  });

  describe("GET /pokemons/:id", () => {
    // it("should get 404 if id doesn't exist", () => {
    //   return agent.get("/pokemons/aa").expect(404);
    // });

    it("should get 200 when pokemon id is found", () => {
      let newPokemon = Pokemon.create({
        name: "Ratatuile",
        id: 99999,
      }).then(() => {
        return agent.get(`/pokemons/${newPokemon.id}`).expect(200);
      });
    });
  });
});
