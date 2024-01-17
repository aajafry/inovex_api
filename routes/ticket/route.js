const express = require('express');
const authGuard = require('../../middlewares/authGuard');
const ticketController = require('../../controllers/ticket/controller');

const ticketRoute = express.Router();

ticketRoute.use(authGuard);

ticketRoute.post('/create', ticketController.create);
ticketRoute.get('/', ticketController.getAll);
ticketRoute.get('/:id', ticketController.findById);
ticketRoute.put('/update/:id', ticketController.updateById);
ticketRoute.delete('/delete:id', ticketController.deleteById);

module.exports = ticketRoute;