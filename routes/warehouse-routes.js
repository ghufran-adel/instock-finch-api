const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers/warehouse-controllers");

router.route("/").get(warehouseController.getWarehouseList);
router.route("/:id").get(warehouseController.getWarehouseByID);

//API delete warehouse
router.route("/:id").delete(warehouseController.deleteWarehouse)

module.exports = router;
