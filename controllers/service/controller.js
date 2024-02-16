const serviceModel = require('../../models/service/model');
const companyModel = require('../../models/company/model');

const serviceController = {
    create: async (req, res) => {
        const companyId = '65b36da80555338bceb2fa29';
        const url = req.protocol + '://' + req.get('host');
        const newService = new serviceModel({
            ...req.body,
            attachment: url + '/public/' + req?.file?.filename
        });
        try {
         const populatedService = await newService.save();
         await companyModel.updateOne({ _id: companyId }, {
            $push: {  services: populatedService._id }
        });
         res.status(200).json({ 
            services: populatedService,
            message: "Successfully Inserted New Service" 
        })
        } catch (error) {
         res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    getAll: async (req, res) => {
        try {
            const service = await serviceModel.find()
                .populate("invoices", "_id")
                .exec();
            res.status(200).json({
                services: service, 
                message: "Successfully Retrieved" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    findById: async (req, res) => {
        try {
            const service = await serviceModel.findById(req.params.id)
            .populate("invoices")
            .exec();
            if (service == null) {
                return res.status(404).json({ message: 'service Not Found' });
            }
            res.status(200).json({
                services: service, 
                message: "Successfully Retrieved"
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    updateById: async (req, res) => {
        try {
            const service = await serviceModel.findByIdAndUpdate(
                req.params.id,
                { $set: {
                    name: req.body.name,
                    brif: req.body.brif,
                    attachment: req.body.attachment,
                    duration: req.body.duration,
                    paymentTerm: req.body.paymentTerm,
                    price: req.body.price,
                  }
                },
                { new: true }
            );
            if (service == null) {
                return res.status(404).json({ message: 'Service Not Found' });
            }
            res.status(200).json({ 
                services: service, 
                message: "Successfully Updated" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    deleteById: async (req, res) => {
        try {
            const service = await serviceModel.findByIdAndDelete(req.params.id);
            if (service == null) {
                return res.status(404).json({ message: 'Service Not Found' });
            }
            res.status(200).json({ 
                services: service,
                 message: "Successfully Deleted" 
                })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    }
}

module.exports = serviceController;