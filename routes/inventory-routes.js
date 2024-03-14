const express = require("express");
const router = express.Router();

const addNewInventory = async (req, res) => {
  // check input fields
  if (
    !req.body.warehouse_id ||
    !req.body.item_name ||
    !req.body.description ||
    !req.body.category ||
    !req.body.status ||
    !req.body.quantity
  ) {
    const missingFields = [];
    if (!req.body.warehouse_id) missingFields.push("warehouse_id");
    if (!req.body.item_name) missingFields.push("item_name");
    if (!req.body.description) missingFields.push("description");
    if (!req.body.category) missingFields.push("category");
    if (!req.body.status) missingFields.push("status");
    if (!req.body.quantity) missingFields.push("quantity");

    return res.status(400).json({
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }
  try {
    const result = await knex("inventories").insert(req.body);

    const newItemId = result[0];
    const createdInventoryItem = await knex("inventories").where({
      id: newItemId,
    });

    res
      .status(201)
      .json(`new inventory item ${createdInventoryItem} is createed`);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new inventory item: ${error}`,
    });
  }
};

router.route("/").post(addNewInventory);

module.exports = router;
