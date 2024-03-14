const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers/warehouse-controllers");

router.route("/").get(warehouseController.getWarehouseList);

module.exports = router;
