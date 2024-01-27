const express = require('express');
const userController = require('../../controllers/user/controller');

const loginRoute = express.Router();

loginRoute.post('/login', userController.login);

module.exports = loginRoute;