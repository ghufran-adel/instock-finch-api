const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

//API to GET a Single Inventory Item
router.get("/:id", (req, res) => {
  // check if id exists in database
  const inventoryItems = [];
  if (!req.params || !inventoryItems.includes(req.params)) {
    res.send("invalid id input"), 404;
  }
});
module.exports = router;

// GET /api/inventories/:id

// Response returns 404 if the ID is not found

// Response returns 200 if successful

// /api/inventories/1 Response body example:
