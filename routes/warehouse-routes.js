const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers/warehouse-controllers");

router.route("/").get(warehouseController.getWarehouseList);
router.route("/:id").get(warehouseController.getWarehouseByID);

module.exports = router;
