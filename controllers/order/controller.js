const orderModel = require('../../models/order/model');
const clientModel = require('../../models/client/model');
const userModel = require('../../models/team/model');

const orderController = {
    create: async (req, res) => {
        let serviceID = "65a57e2780fbb1401f6b8a52",
            clientID = "65a57d175d52260d58a111fa",
            managerID = "65a57f8d80fbb1401f6b8a5a";
        const newOrder = new orderModel({
            ...req.body,
        // could i use req.body.order or '' then i manage this clientend ?
            service: serviceID,
            client: clientID,
            manager: managerID,
        });
        try {
            const populatedOrder = await newOrder.save();
            await clientModel.updateOne({ _id: populatedOrder.client }, {
                $push: {  orders: populatedOrder._id }
            });
            await userModel.updateOne({ _id: populatedOrder.manager }, {
                $push: {  orders: populatedOrder._id }
            });
            res.status(200).json({ 
                orders: populatedOrder, 
                message: "Successfully Inserted new Order" 
            })
       } catch (error) {
        res.status(500).json({ message: "Thare was a Server Side Error" })
       }
    },
    getAll: async (req, res) => {
        try {
            const order = await orderModel.find()
              .populate("service", "name")
              .populate("client", "name")
              .populate("manager", "name")
              .populate("tickets")
              .exec();
            res.status(200).json({ 
                orders: order, 
                message: "Successfully Retrieved" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    findById: async (req, res) => {
        try {
            const order = await orderModel.findById(req.params.id)
              .populate("service", "name")
              .populate("client", "name")
              .populate("manager", "name")
              .populate("tickets")
              .exec();
            if (order == null) {
                return res.status(404).json({ message: 'Order not Found' });
            }
            res.status(200).json({ 
                orders: order, 
                message: "Successfully Retrieved" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server side Error" })
        }
    },
    updateById: async (req, res) => {
        try {
            const order = await orderModel.findByIdAndUpdate(
                req.params.id,
                { $set: {
                    service: req.body.service,
                    client: req.body.client,
                    manager: req.body.manager,
                    brif: req.body.brif,
                    attachment: req.body.attachment,
                    openedAt: req.body.openedAt,
                    completedAt: req.body.completedAt,
                    quantity: req.body.quantity,
                    budget: req.body.budget,
                  }
                },
                { new: true }
            );
            if (order == null) {
                return res.status(404).json({ message: 'Order Not Found' });
            }
            res.status(200).json({ 
                orders: order, 
                message: "Successfully Updated" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    deleteById:  async (req, res) => {
        try {
            const order = await orderModel.findByIdAndDelete(req.params.id);
            if (order == null) {
                return res.status(404).json({ message: 'Order Not Found' });
            }
            res.status(200).json({ 
                orders: order, 
                message: "Successfully Deleted" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    }
}

module.exports = orderController;