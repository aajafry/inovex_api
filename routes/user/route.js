let express = require('express');
let authGuard = require('../../middlewares/authGuard');
let upload = require('../../middlewares/uploadStorage');
let userController = require('../../controllers/user/controller');

let userRoute = express.Router();

userRoute.use(authGuard);

userRoute.post('/create', upload.single('image'), userController.create);
userRoute.get('/', userController.getAll);
userRoute.get('/:id', userController.findById);
userRoute.put('/update/:id', userController.updateById);
userRoute.delete('/delete/:id', userController.deleteById);

module.exports = userRoute;