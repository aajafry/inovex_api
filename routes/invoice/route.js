let express = require('express');
let authGuard = require('../../middlewares/authGuard');
let invoiceController = require('../../controllers/invoice/controller');

let invoiceRoute = express.Router();

invoiceRoute.use(authGuard);

invoiceRoute.post('/create', invoiceController.create);
invoiceRoute.get('/', invoiceController.getAll);
invoiceRoute.get('/:id', invoiceController.findById);
invoiceRoute.put('/update/:id', invoiceController.updateById);
invoiceRoute.delete('/delete/:id', invoiceController.deleteById);

module.exports = invoiceRoute;