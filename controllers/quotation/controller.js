const cloudinary = require('../../utilities/cloudinary');
const quotationModel = require('../../models/quotation/model');
const companyModel = require('../../models/company/model');
const userModel = require('../../models/user/model');

const quotationController = {
    create: async (req, res) => {
        try {
           const companyId = '65c687c66ec327c1dae9041f';
        //    const url = req.protocol + '://' + req.get('host');
           const result = await cloudinary.uploader.upload(req?.file?.path);
           const newQuotation = new quotationModel({
               ...req.body,
               service: req.body.service,
               client: req.body.client,
               manager: req.body.manager,
               attachment: result?.secure_url,
            //    attachment: url + '/public/' + req?.file?.filename
           })
           const populatedQuotation = await newQuotation.save();
            await companyModel.updateOne({ _id: companyId }, {
                $push: {  quotations: populatedQuotation._id }
            });
           await userModel.updateOne({ _id: populatedQuotation.client }, {
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