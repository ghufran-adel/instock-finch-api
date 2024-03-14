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

// GET single warehouse
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


// Validation checks
function isValidEmail(email) {
  // regex matches "example@example.com" (username before "@" and domain afterwards)
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

function isValidPhoneNumber(phoneNumber) {
  // regex matches numbers such as "+1 (646) 123-1234" and "780-555-5555"
  const phoneRegex = /^(?:\+\d{1,2}\s\(\d{3}\)\s\d{3}-\d{4}|\d{3}-\d{3}-\d{4})$/;
  return phoneRegex.test(phoneNumber);
};


// UPDATE warehouse details
const updateWarehouse = async (req, res) => {

  if (req.body.warehouse_name === "") {
    return res.status(500).json({
      message: `Warehouse Name cannot be empty`
    });
  }
  if (req.body.address === "") {
    return res.status(500).json({
      message: `Street Address cannot be empty`
    });
  }
  if (req.body.city === "") {
    return res.status(500).json({
      message: `City cannot be empty`
    });
  }
  if (req.body.country === "") {
    return res.status(500).json({
      message: `Country cannot be empty`
    });
  }
  if (req.body.contact_name === "") {
    return res.status(500).json({
      message: `Contact Name cannot be empty`
    });
  }
  if (req.body.contact_position === "") {
    return res.status(500).json({
      message: `Position cannot be empty`
    });
  }
  if (req.body.contact_phone === "") {
    return res.status(500).json({
      message: `Phone Number cannot be empty`
    });
  }
  if (req.body.contact_email === "") {
    console.log(req.body.contact_email)
    return res.status(500).json({
      message: `Email cannot be empty`
    });
  }

  // NEED TO FIX
  // if (!isValidEmail(req.body.contact_email)) {
  //   return res.status(500).json({
  //     message: `Email is not valid`
  //   });
  // }
  // if (!isValidPhoneNumber(req.body.contact_phone)) {
  //   // console.log(req.body.contact_phone)
  //   return res.status(500).json({
  //     message: `Phone Number is not valid`
  //   });
  // }


  try {
    const rowsUpdated = await knex("warehouses")
      .where({ id: req.params.id })
      .update(req.body);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} not found`
      });
    }

    const updatedWarehouse = await knex("warehouses")
      .where({
        id: req.params.id,
      });
    res.json(updatedWarehouse[0]);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update warehouse with ID ${req.params.id}: ${error}`
    });
  }
};


module.exports = {
  getWarehouseList,
  getWarehouseByID,
  updateWarehouse,
};
