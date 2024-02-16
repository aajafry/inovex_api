let express = require('express');
let authGuard = require('../../middlewares/authGuard');
let upload = require('../../middlewares/uploadStorage');
let serviceController = require('../../controllers/service/controller');

let serviceRoute = express.Router();

serviceRoute.use(authGuard);

serviceRoute.post('/create', upload.single('attachment'), serviceController.create);
serviceRoute.get('/', serviceController.getAll);
serviceRoute.get('/:id', serviceController.findById);
serviceRoute.put('/update/:id', serviceController.updateById);
serviceRoute.delete('/delete/:id', serviceController.deleteById);

module.exports = serviceRoute;