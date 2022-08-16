const { Router } = require("express");
// const { Pokemon, Type } = require("../db");
const axios = require("axios");
const router = Router();
// const { Sequalize, Op } = require("sequelize");

router.get("/types", async (req, res, next) => {
  try {
    const types = await axios
      .get("https://pokeapi.co/api/v2/type")
      .then((d) => d.data.results);

    let listOfTypes = types.map((t) => {
      return t.name;
    });

    listOfTypes.sort();

    res.json(listOfTypes);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
