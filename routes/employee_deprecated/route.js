const express = require('express');
const authGuard = require('../../middlewares/authGuard');
const employeeController = require('../../controllers/employee/controller');

const employeeRoute = express.Router();

employeeRoute.use(authGuard);

employeeRoute.post('/create', employeeController.create);
employeeRoute.get('/', employeeController.getAll);
employeeRoute.get('/:id', employeeController.findById);
employeeRoute.put('/update/:id', employeeController.updateById);
employeeRoute.delete('/delete/:id', employeeController.deleteById);

module.exports = employeeRoute;