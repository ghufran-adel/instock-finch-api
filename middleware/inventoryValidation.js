//middleware function for validating the request body
const validateInventory = (req, res, next) => {
  if (!req.body.item_name || !req.body.description || !req.body.category) {
    const missingFields = [];
    if (!req.body.item_name) missingFields.push("item_name");
    if (!req.body.description) missingFields.push("description");
    if (!req.body.category) missingFields.push("category");

    return res.status(400).json({
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  // Validate quantity
  if (typeof req.body.quantity !== "number" || req.body.quantity < 0) {
    return res.status(400).json({
      message: "Quantity must be a non-negative number",
    });
  }

  // Validate status
  const validStatusValues = ["In Stock", "Out Of Stock"];
  if (!validStatusValues.includes(req.body.status)) {
    return res.status(400).json({
      message: `Invalid status value: ${req.body.status}`,
    });
  }

  next();
};

// Export the middleware function
module.exports = { validateInventory };
