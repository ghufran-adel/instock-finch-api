const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers/warehouse-controllers");

router
    .route("/")
    .get(warehouseController.getWarehouseList)
    .post(warehouseController.postNewWarehouse);

router
    .route("/:id")
    .delete(warehouseController.deleteWarehouse)


router
    .route("/:id")
    .get(warehouseController.getWarehouseByID);

router
    .route('/:id')
    .patch(warehouseController.updateWarehouse);

router
    .route("/:id/inventories")
    .get(warehouseController.getWarehouseInventoryList)

module.exports = router;