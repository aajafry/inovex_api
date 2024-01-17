const express = require('express');
const authGuard = require('../../middlewares/authGuard');
const orderController = require('../../controllers/order/controller');

const orderRoute = express.Router();

orderRoute.use(authGuard);

orderRoute.post('/create', orderController.create);
orderRoute.get('/', orderController.getAll);
orderRoute.get('/:id', orderController.findById);
orderRoute.put('/update/:id', orderController.updateById);
orderRoute.delete('/delete/:id', orderController.deleteById);

module.exports = orderRoute;