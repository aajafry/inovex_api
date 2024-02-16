let express = require('express');
let authGuard = require('../../middlewares/authGuard');
let ticketController = require('../../controllers/ticket/controller');

let ticketRoute = express.Router();

ticketRoute.use(authGuard);

ticketRoute.post('/create', ticketController.create);
ticketRoute.get('/', ticketController.getAll);
ticketRoute.get('/:id', ticketController.findById);
ticketRoute.put('/update/:id', ticketController.updateById);
ticketRoute.delete('/delete:id', ticketController.deleteById);

module.exports = ticketRoute;