const knex = require("knex")(require("../knexfile"));
// function to find an inventory that matches with the id parmas
const findOneInventory = async (req, res) => {
  try {
    const inventoriesFound = await knex("inventories").where({
      id: req.params.id,
    });

    if (inventoriesFound.length === 0) {
      return res.status(404).json({
        message: `Inventory with ID ${req.params.id} not found`,
      });
    }

    const InventoryData = inventoriesFound[0];
    res.json(InventoryData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve inventory data for inventory item with ID ${req.params.id}`,
    });
  }
};

module.exports = findOneInventory;
