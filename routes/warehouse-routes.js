const express = require("express");
const router = express.Router();
const warhouseController = require('../controllers/warehouse-controllers')

router
    .route('/')
    .get(warhouseController.getWarehouseList);

module.exports = router;