const router = require("express").Router();
const inventoryController = require("../controllers/inventory-controllers");
const { validateInventory } = require("../middleware/inventoryValidation");


//API to GET a Single Inventory Item
router.get("/:id", inventoryController.findOneInventory);

// API to GET all Inventory Item
router.get("/", inventoryController.inventories);
router.post("/", inventoryController.addNewInventory);
router.patch ("/:id",validateInventory, inventoryController.updateInventory);

module.exports = router;
