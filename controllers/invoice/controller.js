const invoiceModel = require('../../models/invoice/model');
const companyModel = require('../../models/company/model');
const serviceModel = require('../../models/service/model');

const invoiceController = {
    create: async (req, res) => {
        const companyId = '65c687c66ec327c1dae9041f';
        const newInvoice = new invoiceModel({
            ...req.body,
            service: req.body.service,
            client: req.body.client,
            order: req.body.order,
        });
        try {
            const populatedInvoice = await newInvoice.save();
            await companyModel.updateOne({ _id: companyId }, {
                $push: {  invoices: populatedInvoice._id }
            });
            await serviceModel.updateOne({ _id: populatedInvoice.service }, {
                $push: {  invoices: populatedInvoice._id }
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
              .populate("client")
              .populate("service", "name")
              .populate("order", "_id")
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
              .populate("client")
              .populate("service", "name")
              .populate("order", "_id")
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
                    order: req.body.order,
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