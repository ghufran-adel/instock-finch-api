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

const postNewWarehouse = async (req, res) => {
    try {
        const { warehouse_name, address, city, country, contact_name, contact_position, contact_phone, contact_email } = req.body;
        const newWarehouse = await knex('warehouses').insert({
            warehouse_name,
            address,
            city,
            country,
            contact_name,
            contact_position,
            contact_phone,
            contact_email
        });
  
        res.status(201).json(newWarehouse);
    } catch (error) {
        res.status(400).json({ error: `Unable to create new warehouse: ${error}` });
    }
};

module.exports = {
    getWarehouseList,
    postNewWarehouse,

}