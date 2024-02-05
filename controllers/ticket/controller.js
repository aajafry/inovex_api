const ticketModel = require('../../models/ticket/model');
const orderModel = require('../../models/order/model');
const userModel = require('../../models/user/model');

const ticketController = {
    create: async (req, res) => {
       const newTicket = new ticketModel({
            ...req.body,
            order: req.body.order,
            client: req.body.client,
            manager: req.body.manager,
        })
       try {
        const populatedTicket = await newTicket.save();

        await orderModel.updateOne({ _id: populatedTicket.order }, {
            $push: { tickets: populatedTicket._id }
        });
        await userModel.updateOne({ _id: populatedTicket.client }, {
            $push: { tickets: populatedTicket._id }
        });
        await userModel.updateOne({ _id: populatedTicket.manager }, {
            $push: { tickets: populatedTicket._id }
        });

        res.status(200).json({ 
            tickets: populatedTicket, 
            message: "Successfully Inserted New Ticket" 
        })
       } catch (error) {
        res.status(500).json({ message: "Thare was a Server Side Error" })
       }
    },
    getAll: async (req, res) => {
        try {
            const ticket = await ticketModel.find()
              .populate("order", "_id")
              .populate("client", "name")
              .populate("manager", "name")
              .exec();
            res.status(200).json({ 
                tickets: ticket, 
                message: "Successfully Retrieved" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    findById: async (req, res) => {
        try {
            const ticket = await ticketModel.findById(req.params.id)
              .populate("order", "_id")
              .populate("client", "name")
              .populate("manager", "name")
              .exec();
            if (ticket == null) {
                return res.status(404).json({ message: 'Ticket Not Found' });
            }
            res.status(200).json({ 
                tickets: ticket, 
                message: "Successfully Retrieved" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    updateById: async (req, res) => {
        try {
            const ticket = await ticketModel.findByIdAndUpdate(
                req.params.id,
                { $set: {
                    subject: req.body.subject,
                    brif: req.body.brif,
                    order: req.body.order,
                    client: req.body.client,
                    manager: req.body.manager,
                    priority: req.body.priority,
                    status: req.body.status,
                  }
                },
                { new: true }
            );
            if (ticket == null) {
                return res.status(404).json({ message: 'Ticket Not Found' });
            }
            res.status(200).json({ 
                tickets: ticket, 
                message: "Successfully Updated" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    deleteById: async (req, res) => {
        try {
            const ticket = await ticketModel.findByIdAndDelete(req.params.id);
            if (ticket == null) {
                return res.status(404).json({ message: 'Ticket Not Found' });
            }
            res.status(200).json({ 
                tickets: ticket, 
                message: "Successfully Deleted" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    }
}
module.exports = ticketController;