const express = require('express');
const authGuard = require('../../middlewares/authGuard');
const invoiceController = require('../../controllers/invoice/controller');

const invoiceRoute = express.Router();

invoiceRoute.use(authGuard);

invoiceRoute.post('/create', invoiceController.create);
invoiceRoute.get('/', invoiceController.getAll);
invoiceRoute.get('/:id', invoiceController.findById);
invoiceRoute.put('/update/:id', invoiceController.updateById);
invoiceRoute.delete('/delete/:id', invoiceController.deleteById);

module.exports = invoiceRoute;