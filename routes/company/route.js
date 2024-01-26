const express = require('express');
const authGuard = require('../../middlewares/authGuard');
const companyController = require('../../controllers/company/controller');

const companyRoute = express.Router();

companyRoute.use(authGuard);

companyRoute.post('/create', companyController.create);
companyRoute.get('/', companyController.getAll);
companyRoute.get('/:id', companyController.findById);
companyRoute.put('/update/:id', companyController.updateById);
companyRoute.delete('/delete/:id', companyController.deleteById);

module.exports = companyRoute;