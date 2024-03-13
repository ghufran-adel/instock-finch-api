const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

const inventoryController = require("../controllers/inventory-controllers");

//API to GET a Single Inventory Item
router.route("/:id").get(inventoryController.findOneInventory);

router.get("/:id", (req, res) => {
  // check if id exists in database
  const inventoryItems = [];
  if (!req.params || !inventoryItems.includes(req.params)) {
    res.send("invalid id input"), 404;
  }
});

module.exports = router;
