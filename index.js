const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const { PORT, CORS_ORIGIN } = process.env;
const allowedOrigins = CORS_ORIGIN.split(",");
const port = PORT || 5051;

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

const inventoryRoutes = require("./routes/inventory-routes");
const warehouseRoutes = require("./routes/warehouse-routes");

// All routes
app.use("/api/warehouses", warehouseRoutes);
app.use("/api/inventories", inventoryRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
