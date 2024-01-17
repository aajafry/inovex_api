const quotationModel = require('../../models/quotation/model');
const clientModel = require('../../models/client/model');
const userModel = require('../../models/team/model');

const quotationController = {
    create: async (req, res) => {
        let serviceID = "65a57e2780fbb1401f6b8a52",
            clientID = "65a57d175d52260d58a111fa",
            managerID = "65a57f8d80fbb1401f6b8a5a";
       const newQuotation = new quotationModel({
            ...req.body,
            // could i use req.body.order or '' then i manage this clientend ?
            service: serviceID,
            client: clientID,
            manager: managerID,
        })
       try {
           const populatedQuotation = await newQuotation.save();

           await clientModel.updateOne({ _id: populatedQuotation.client }, {
               $push: { quotations: populatedQuotation._id }
            });
           await userModel.updateOne({ _id: populatedQuotation.manager }, {
               $push: { quotations: populatedQuotation._id }
            });
           res.status(200).json({ 
              quotations: populatedQuotation,
              message: "Successfully Inserted New Quotation" 
           })
       } catch (error) {
        res.status(500).json({ message: "Thare was a Server Side Error" })
       }
    },
    getAll: async (req, res) => {
        try {
            const quotation = await quotationModel.find()
            .populate("service", "name")
            .populate("client", "name")
            .populate("manager", "name")
            .exec();
            res.status(200).json({ 
                quotations: quotation, 
                message: "Successfully Retrieved" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    findById: async (req, res) => {
        try {
            const quotation = await quotationModel.findById(req.params.id)
            .populate("service", "name")
            .populate("client", "name")
            .populate("manager", "name")
            .exec();
            if (quotation == null) {
                return res.status(404).json({ message: 'Quotation Not Found' });
            }
            res.status(200).json({ 
                quotations: quotation, 
                message: "Successfully Retrieved" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    updateById: async (req, res) => {
        try {
            const quotation = await quotationModel.findByIdAndUpdate(
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
            if (quotation == null) {
                return res.status(404).json({ message: 'Quotation Not Found' });
            }
            res.status(200).json({ 
                quotations: quotation, 
                message: "Successfully Updated" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    deleteById: async (req, res) => {
        try {
            const quotation = await quotationModel.findByIdAndDelete(req.params.id);
            if (quotation == null) {
                return res.status(404).json({ message: 'Quotation Not Found' });
            }
            res.status(200).json({ 
                quotations: quotation, 
                message: "Successfully Deleted" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    }
}

module.exports = quotationController;