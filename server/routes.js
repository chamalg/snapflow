const express = require("express");
const items = require("./items");
const { getFavorites, addFavorite, removeFavorite } = require("./favorites");

const router = express.Router();

router.get("/items", (req, res) => {
  res.json(items);
});

router.get("/favorites", (req, res) => {
  res.json(getFavorites());
});

router.post("/favorites", (req, res) => {
  addFavorite(req.body.id);
  res.json(getFavorites());
});

router.delete("/favorites/:id", (req, res) => {
  removeFavorite(parseInt(req.params.id, 10));
  res.json(getFavorites());
});

module.exports = router;
