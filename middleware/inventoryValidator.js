const knex = require("knex")(require("../knexfile"));
const inventoryValidator = async (req, res, next) => {
  // check input fields
  const missingFields = [];
  if (!req.body.warehouse_id) missingFields.push("warehouse_id");
  if (!req.body.item_name) missingFields.push("item_name");
  if (!req.body.description) missingFields.push("description");
  if (!req.body.category) missingFields.push("category");
  if (!req.body.status) missingFields.push("status");
  if (req.body.quantity === undefined) missingFields.push("quantity");

  const errorMessages = [];
  // check if quantity input is a number
  if (
    (req.body.quantity && !Number.isInteger(req.body.quantity)) ||
    (req.body.quantity &&
      Number.isInteger(req.body.quantity) &&
      req.body.quantity < 0)
  ) {
    errorMessages.push(
      "Quanity field is not valid, please input a valid integer."
    );
  }
  // validate quantity cant be 0 if status is instock
  console.log(req.body.status.toLowerCase());
  if (
    req.body.status &&
    req.body.status.trim().toLowerCase() == "in stock" &&
    Number.isInteger(req.body.quantity) &&
    req.body.quantity === 0
  ) {
    errorMessages.push(
      "Quanity field is not valid, please input a number greater than 0 if item is instock."
    );
  }
  if (req.body.warehouse_id) {
    // check if warehouse_id is in the warehouse table
    const warehouseFound = await knex("warehouses").where({
      id: req.body.warehouse_id,
    });
    if (warehouseFound.length === 0) {
      errorMessages.push(
        "The warehouse_id does not exisit in the warehouse table, please input a valid warehouse id."
      );
    }
  }

  if (missingFields.length !== 0 || errorMessages.length !== 0) {
    return res.status(400).json({
      message: `Validation failed: ${errorMessages.join("; ")} ${
        missingFields.length !== 0
          ? "\nMissing required fields: " + missingFields.join(", ")
          : ""
      }`,
    });
  }
  next();
};
module.exports = { inventoryValidator };
