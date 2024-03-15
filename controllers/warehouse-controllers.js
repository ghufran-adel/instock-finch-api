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

// GET warehouse list by ID
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

// POST/CREATE a new warehouse -- ticket J24ID-19 --
const postNewWarehouse = async (req, res) => {
  try {
      const { warehouse_name, address, city, country, contact_name, contact_position, contact_phone, contact_email } = req.body;
      await knex('warehouses').insert({
          warehouse_name,
          address,
          city,
          country,
          contact_name,
          contact_position,
          contact_phone,
          contact_email
      });

      res.status(201).json({ message: 'New warehouse created successfully', data: req.body });
  } catch (error) {
      res.status(400).json({ error: `Unable to create new warehouse: ${error}` });
  }
};




module.exports = {
  getWarehouseList,
  getWarehouseByID,
  postNewWarehouse,
};