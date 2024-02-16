let express = require('express');
let authGuard = require('../../middlewares/authGuard');
let upload = require('../../middlewares/uploadStorage');
let quotationController = require('../../controllers/quotation/controller');

let quotationRoute = express.Router();

quotationRoute.use(authGuard);

quotationRoute.post('/create', upload.single('attachment'), quotationController.create);
quotationRoute.get('/', quotationController.getAll);
quotationRoute.get('/:id', quotationController.findById);
quotationRoute.put('/update/:id', quotationController.updateById);
quotationRoute.delete('/delete/:id', quotationController.deleteById);

module.exports = quotationRoute;