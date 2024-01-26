const serviceModel = require('../../models/service/model');

const serviceController = {
    create: async (req, res) => {
        const newService = new serviceModel(req.body);
        try {
         await newService.save();
         res.status(200).json({ 
            services: newService,
            message: "Successfully Inserted New Service" 
        })
        } catch (error) {
         res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    getAll: async (req, res) => {
        try {
            const service = await serviceModel.find()
                .populate("invoice", "_id")
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
            .populate("invoice")
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