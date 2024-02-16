let express = require('express');
let authGuard = require('../../middlewares/authGuard');
let upload = require('../../middlewares/uploadStorage');
let companyController = require('../../controllers/company/controller');

let companyRoute = express.Router();

companyRoute.use(authGuard);

companyRoute.post('/create', upload.single('logo'), companyController.create);
companyRoute.get('/', companyController.getAll);
companyRoute.get('/:id', companyController.findById);
companyRoute.put('/update/:id', companyController.updateById);
companyRoute.delete('/delete/:id', companyController.deleteById);

module.exports = companyRoute;