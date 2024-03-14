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

module.exports = {
    getWarehouseList,

}