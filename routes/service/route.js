const express = require('express');
const authGuard = require('../../middlewares/authGuard');
const serviceController = require('../../controllers/service/controller');

const serviceRoute = express.Router();

serviceRoute.use(authGuard);

serviceRoute.post('/create', serviceController.create);
serviceRoute.get('/', serviceController.getAll);
serviceRoute.get('/:id', serviceController.findById);
serviceRoute.put('/update/:id', serviceController.updateById);
serviceRoute.delete('/delete/:id', serviceController.deleteById);

module.exports = serviceRoute;