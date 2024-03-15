const knex = require("knex")(require("../knexfile"));

// GET warehouse list
const getWarehouseList = async (_req, res) => {
  try {
    const data = await knex("warehouses");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving Warehouses: ${error}`);
  }
};

const getWarehouseByID = async (req, res) => {
  try {
    const warehouseFound = await knex("warehouses").where({
      id: req.params.id,
    });
    if (!req.params.id || warehouseFound.length === 0) {
      return res.status(404).json({
        message: `Inventory with ID ${req.params.id} not found`,
      });
    }
    const warehousesData = warehouseFound[0];
    res.json(warehousesData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve inventory data for warehouse item with ID ${req.params.id}, encountering error ${error}`,
    });
  }
};

// Response returns 404 if warehouse ID is not found

// Response returns 204 if successfully deleted

// No response body
const deleteWarehouse = async(req, res) => {
  try {
    const getWarehouseId = await knex("warehouses").where({id: req.params.id}).del();
    if(!req.params.id) {
      res.status(404).json({
        message: `Warehouse ID ${req.params.id} not found`
      })
    }
    res.status(204).json({message: `warehouse ${req.params.id} succesffully deleted`})
  } catch(error) {
    res.status(500).json({
      message: `Encountering error ${error}`,
    });
  }
}

module.exports = {
  getWarehouseList,
  getWarehouseByID,
  deleteWarehouse,
};
