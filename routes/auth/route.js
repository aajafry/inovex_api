let express = require('express');
let authController = require('../../controllers/auth/controller');

let authRoute = express.Router();

authRoute.post('/signup', authController.signup);
authRoute.post('/login', authController.login);

module.exports = authRoute;