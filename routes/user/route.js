const express = require('express');
const authGuard = require('../../middlewares/authGuard');
const userController = require('../../controllers/user/controller');

const userRoute = express.Router();

userRoute.use(authGuard);

userRoute.post('/create', userController.create);
userRoute.get('/', userController.getAll);
userRoute.get('/:id', userController.findById);
userRoute.put('/update/:id', userController.updateById);
userRoute.delete('/delete/:id', userController.deleteById);

module.exports = userRoute;