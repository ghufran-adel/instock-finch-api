const knex = require('knex')(require('../knexfile'));

// GET warehouse list
const getWarehouseList = async (_req, res) => {
    try {
        const data = await knex('warehouses');
        res.status(200).json(data);
    } catch (error) {
        res.status(400).send(`Error retrieving Warehouses: ${error}`)
    }
}

// UPDATE warehouse details
const updateWarhouse = async (req, res) => {
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
    updateWarhouse,
}