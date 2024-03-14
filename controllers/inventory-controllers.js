const knex = require("knex")(require("../knexfile"));
// function to find an inventory that matches with the id parmas
const findOneInventory = async (req, res) => {
  try {
    const inventoriesFound = await knex("inventories").where({
      id: req.params.id,
    });
    if (!req.params.id || inventoriesFound.length === 0) {
      return res.status(404).json({
        message: `Inventory with ID ${req.params.id} not found`,
      });
    }
    const InventoryData = inventoriesFound[0];
    res.json(InventoryData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve inventory data for inventory item with ID ${req.params.id}, encountering error ${error}`,
    });
  }
};

// controller to get the inventory list
const inventories = async (_req, res) => {
  try {
    const data = await knex("inventories");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving Inventories: ${err}`);
  }
};

// controller to add a new inventory item
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
module.exports = { inventories, findOneInventory, addNewInventory };
