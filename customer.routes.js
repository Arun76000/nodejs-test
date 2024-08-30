const router = require('express').Router();

const customer = require('./customer.controller');

// get customer by first-name last-name or city
router.get('/', customer.getAll);
// get customer by first-name last-name or city
router.get('/single', customer.getCustomerByNameOrCity);
// get customer by id
router.get('/:id', customer.getById);
// get Number of customer Of All city
router.get('/city/data', customer.getAllCityCustomer);
// get Number of customer According to city
router.get('/city/data/:city', customer.getUsersByCity);
// add customer
router.post('/', customer.createCustomer);
// add customer
router.put('/:customerId', customer.updateCustomerById);

module.exports = router;
