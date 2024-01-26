const invoiceModel = require('../../models/invoice/model');
const serviceModel = require('../../models/service/model');

const invoiceController = {
    create: async (req, res) => {
        let serviceID = "65b36e430555338bceb2fa2d",
            clientID = "65b36ff5aa0cf640d59e1113",
            orderID = "65b379eb6978ab03ed7e642e";
        
        const newInvoice = new invoiceModel({
            ...req.body,
            // could i use req.body.order or '' then i manage this clientend ?
            service: serviceID,
            client: clientID,
            orderId: orderID,
        });
        try {
            const populatedInvoice = await newInvoice.save();
            await serviceModel.updateOne({ _id: populatedInvoice.service }, {
                $push: {  invoice: populatedInvoice._id }
            });
         res.status(200).json({ 
            invoice: populatedInvoice,
            message: "Successfully Inserted New Invoice" 
        })
        } catch (error) {
         res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    getAll: async (req, res) => {
        try {
            const invoice = await invoiceModel.find()
              .populate("client", "name")
              .populate("service", "name")
              .populate("orderId", "_id")
              .exec();
            res.status(200).json({
                invoices: invoice,
                message: "Successfully Retrieved"
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    findById: async (req, res) => {
        try {
            const invoice = await invoiceModel.findById(req.params.id)
              .populate("client", "name")
              .populate("service", "name")
              .populate("orderId", "_id")
              .exec(); 
            if (invoice == null) {
                return res.status(404).json({ message: 'Invoice not Found' });
            }
            res.status(200).json({
                invoice: invoice, 
                message: "Successfully Retrieved" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    updateById: async (req, res) => {
        try {
            const invoice = await invoiceModel.findByIdAndUpdate(
                req.params.id,
                { $set: {
                    client: req.body.client,
                    country: req.body.country,
                    city: req.body.city,
                    state: req.body.state,
                    zip: req.body.zip,
                    service: req.body.service,
                    orderId: req.body.orderId,
                    payableAmt: req.body.payableAmt,
                    discAmt: req.body.discAmt,
                    paidAmt: req.body.paidAmt,
                    dueAmt: req.body.dueAmt,
                    totalAmt: req.body.totalAmt,
                    status: req.body.status,
                    note: req.body.note,
                  }
                },
                { new: true }
            )
            if (invoice == null) {
                return res.status(404).json({ message: 'Invoice Not Found' });
            }
            res.status(200).json({ 
                invoices: invoice, 
                message: "Successfully Updated" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    deleteById: async (req, res) => {
        try {
            const invoice = await invoiceModel.findByIdAndDelete(req.params.id);
            if (invoice == null) {
                return res.status(404).json({ message: 'invoice Not Found' });
            }
            res.status(200).json({ 
                invoice: invoice, 
                message: "Successfully Deleted" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    }
}

module.exports = invoiceController;