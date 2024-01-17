const express = require('express');
const authGuard = require('../../middlewares/authGuard');
const quotationController = require('../../controllers/quotation/controller');

const quotationRoute = express.Router();

quotationRoute.use(authGuard);

quotationRoute.post('/create', quotationController.create);
quotationRoute.get('/', quotationController.getAll);
quotationRoute.get('/:id', quotationController.findById);
quotationRoute.put('/update/:id', quotationController.updateById);
quotationRoute.delete('/delete/:id', quotationController.deleteById);

module.exports = quotationRoute;