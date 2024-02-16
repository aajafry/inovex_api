const orderModel = require('../../models/order/model');
const companyModel = require('../../models/company/model');
const userModel = require('../../models/user/model');

const orderController = {
    create: async (req, res) => {
        const companyId = '65b36da80555338bceb2fa29';
        const url = req.protocol + '://' + req.get('host');
        const newOrder = new orderModel({
            ...req.body,
            service: req.body.service,
            client: req.body.client,
            manager: req.body.manager,
            attachment: url + '/public/' + req?.file?.filename
        });
        try {
            const populatedOrder = await newOrder.save();
            await companyModel.updateOne({ _id: companyId }, {
                $push: {  orders: populatedOrder._id }
            });
            await userModel.updateOne({ _id: populatedOrder.client }, {
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
                    status: req.body.status,
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