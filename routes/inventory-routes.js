const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventory-controllers");

// API to GET all Inventory Item
router.get("/", inventoryController.inventories);
// router.route("/").get(inventoryController.inventories);

//API to GET a Single Inventory Item
router.get("/:id", inventoryController.findOneInventory);
// router.route("/:id").get(inventoryController.findOneInventory);

module.exports = router;
