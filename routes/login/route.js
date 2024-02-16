let express = require('express');
let userController = require('../../controllers/user/controller');

let loginRoute = express.Router();

loginRoute.post('/login', userController.login);

module.exports = loginRoute;