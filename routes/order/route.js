let express = require('express');
let authGuard = require('../../middlewares/authGuard');
let upload = require('../../middlewares/uploadStorage');
let orderController = require('../../controllers/order/controller');

let orderRoute = express.Router();

orderRoute.use(authGuard);

orderRoute.post('/create', upload.single('attachment'), orderController.create);
orderRoute.get('/', orderController.getAll);
orderRoute.get('/:id', orderController.findById);
orderRoute.put('/update/:id', orderController.updateById);
orderRoute.delete('/delete/:id', orderController.deleteById);

module.exports = orderRoute;