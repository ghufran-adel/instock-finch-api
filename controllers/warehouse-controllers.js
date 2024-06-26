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

// DELETE warehouse id
const deleteWarehouse = async (req, res) => {
  try {
    await knex("warehouses").where({ id: req.params.id }).del();
    res.status(204).json(`warehouse deleted`)
  } catch (error) {
    res.status(404).json({
      message: `Warehouse ID ${req.params.id} not found`,
    });
  }
}

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

// POST/CREATE a new warehouse -- ticket J24ID-19 --
const postNewWarehouse = async (req, res) => {
  const { warehouse_name, address, city, country, contact_name, contact_position, contact_phone, contact_email } = req.body;

  const missingFields = [];
  if (!warehouse_name) missingFields.push("warehouse_name");
  if (!address) missingFields.push("address");
  if (!city) missingFields.push("city");
  if (!country) missingFields.push("country");
  if (!contact_name) missingFields.push("contact_name");
  if (!contact_position) missingFields.push("contact_position");
  if (!contact_phone) missingFields.push("contact_phone");
  if (!contact_email) missingFields.push("contact_email");

  const invalidFields = [];
  if (!isValidEmail(contact_email)) invalidFields.push("contact_email");
  if (!isValidPhoneNumber(contact_phone)) invalidFields.push("contact_phone");

  let message = "";
  if (missingFields.length > 0) {
    message += `Missing required fields: ${missingFields.join(", ")}. `;
  }

  if (invalidFields.length > 0) {
    message += `Invalid fields: ${invalidFields.join(", ")}.`;
  }

  if (message !== "") {
    return res.status(400).json({
      message: message,
    });
  }

  try {
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

// UPDATE warehouse details
const updateWarehouse = async (req, res) => {

  const missingFields = [];
  if (!req.body.warehouse_name) missingFields.push("warehouse_name");
  if (!req.body.address) missingFields.push("address");
  if (!req.body.city) missingFields.push("city");
  if (!req.body.country) missingFields.push("country");
  if (!req.body.contact_name) missingFields.push("contact_name");
  if (!req.body.contact_position) missingFields.push("contact_position");
  if (!req.body.contact_phone) missingFields.push("contact_phone");
  if (!req.body.contact_email) missingFields.push("contact_email");

  const invalidFields = [];
  if (!isValidEmail(req.body.contact_email)) invalidFields.push("contact_email");
  if (!isValidPhoneNumber(req.body.contact_phone)) invalidFields.push("contact_phone");

  let message = "";
  if (missingFields.length > 0) {
    message += `Missing required fields: ${missingFields.join(", ")}. `;
  }

  if (invalidFields.length > 0) {
    message += `Invalid fields: ${invalidFields.join(", ")}.`;
  }

  if (message !== "") {
    return res.status(400).json({
      message: message,
    });
  }


  try {
    const { warehouse_name, address, city, country, contact_name, contact_position, contact_phone, contact_email } = req.body;
    const rowsUpdated = await knex("warehouses")
      .where({ id: req.params.id })
      .update({
        warehouse_name,
        address,
        city,
        country,
        contact_name,
        contact_position,
        contact_phone,
        contact_email,
        updated_at: new Date(),

      });

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

// GET inventory for given warehouse
const getWarehouseInventoryList = async (req, res) => {
  try {
    const inventoryList = await knex("inventories").where({ warehouse_id: req.params.id })
    const inventoryArr = []
    if (!req.params.id || inventoryList.length === 0) {
      res.status(404).json({
        message: `warehouse ${req.params.id} not found`
      })
    }
    inventoryList.map((inventory) => {
      const inventoryObj = {
        id: (inventory.id),
        item_name: (inventory.item_name),
        category: (inventory.category),
        status: (inventory.status),
        quantity: (inventory.quantity),
      }
      return(inventoryArr.push(inventoryObj))
    })
    res.status(200).json(inventoryArr);
  } catch (error) {
    res.status(500).json({
      message: `error ${error}`
    })
  }
}

module.exports = {
  postNewWarehouse,
  getWarehouseList,
  getWarehouseByID,
  deleteWarehouse,
  updateWarehouse,
  getWarehouseInventoryList,
};