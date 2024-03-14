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
    postNewWarehouse,

}