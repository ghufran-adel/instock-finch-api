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
  const { category, description, item_name, quantity, warehouse_id, status } =
    req.body;
  // insert a data entry to database
  try {
    const result = await knex("inventories").insert({
      category,
      description,
      item_name,
      quantity,
      warehouse_id,
      status,
    });

    const newItemId = result[0];
    const createdInventoryItem = await knex("inventories").where({
      id: newItemId,
    });

    res.status(201).json(createdInventoryItem);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new inventory item: ${error}`,
    });
  }
};

//delete inventory
const DeleteInventory = async (req, res) => {
  try {
    const DeletedInventory = await knex("inventories")
      .where({ id: req.params.id })
      .delete();

    if (DeletedInventory === 0) {
      return res
        .status(404)
        .json({ message: `Inventory with ID ${req.params.id} not found` });
    }

    // No Content response
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete Inventory: ${error}`,
    });
  }
};

// update inventory
const updateInventory = async (req, res) => {
  try {
    const { category, description, item_name, quantity, status, warehouse_id } =
      req.body;

    // Set status to "Out Of Stock" if quantity is 0
    const updatedStatus = quantity === 0 ? "Out Of Stock" : status;

    const inventoryToUpdate = await knex("inventories")
      .where({ id: req.params.id })
      .update({
        category,
        description,
        item_name,
        quantity,
        status: updatedStatus,
        updated_at: new Date(),
        warehouse_id,
      });

    if (inventoryToUpdate === 0) {
      return res.status(404).json({
        message: `Inventory with ID ${req.params.id} not found`,
      });
    }
    // Check if the warehouse_id exists in the warehouses table
    const existingWarehouse = await knex("warehouses")
      .where({ id: req.body.warehouse_id })
      .first();

    if (!existingWarehouse) {
      return res.status(400).json({
        message: `Warehouse with ID ${req.body.warehouse_id} not found`,
      });
    }

    const updatedInventory = await knex("inventories").where({
      id: req.params.id,
    });

    res.status(200).json(updatedInventory[0]);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update inventory with ID ${req.params.id}: ${error}`,
    });
  }
};

module.exports = {
  inventories,
  findOneInventory,
  addNewInventory,
  updateInventory,
  DeleteInventory,
};
