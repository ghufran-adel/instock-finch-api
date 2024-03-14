const router = require("express").Router();
const inventoryController = require("../controllers/inventory-controllers");

//API to GET a Single Inventory Item
router.get("/:id", inventoryController.findOneInventory);

// API to GET all Inventory Item
router.get("/", inventoryController.inventories);

module.exports = router;
