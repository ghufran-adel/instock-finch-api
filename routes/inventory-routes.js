const router = require("express").Router();
const inventoryController = require("../controllers/inventory-controllers");
const { validateInventory } = require("../middleware/inventoryValidation");
const { inventoryValidator } = require("../middleware/inventoryValidator");
//API to GET a Single Inventory Item
router.get("/:id", inventoryController.findOneInventory);

// API to GET all Inventory Item
router.get("/", inventoryController.inventories);
router.post("/", inventoryValidator, inventoryController.addNewInventory);
router.patch("/:id", validateInventory, inventoryController.updateInventory);
router.delete("/:id", inventoryController.DeleteInventory);

module.exports = router;
