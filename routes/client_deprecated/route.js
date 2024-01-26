const express = require('express');
const authGuard = require('../../middlewares/authGuard');
const clientController = require('../../controllers/client/controller');

const clientRoute = express.Router();

clientRoute.use(authGuard);

clientRoute.post('/create', clientController.create);
clientRoute.get('/', clientController.getAll);
clientRoute.get('/:id', clientController.findById);
clientRoute.put('/update/:id', clientController.updateById);
clientRoute.delete('/delete/:id', clientController.deleteById);

module.exports = clientRoute;