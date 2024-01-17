const clientModel = require('../../models/client/model');

const clientController = {
    create: async (req, res) => {
        const newClient = new clientModel(req.body);
        try {
         await newClient.save();
         res.status(200).json({ 
            clients: newClient,
            message: "Successfully Inserted New Client" 
        })
        } catch (error) {
         res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    getAll: async (req, res) => {
        try {
            const client = await clientModel.find()
              .populate('orders')
              .populate('quotations')
              .populate('tickets')
              .exec();
            res.status(200).json({
                clients: client,
                message: "Successfully Retrieved"
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    findById: async (req, res) => {
        try {
            const client = await clientModel.findById(req.params.id)
              .populate('orders')
              .populate('quotations')
              .populate('tickets')
              .exec();
            if (client == null) {
                return res.status(404).json({ message: 'Client not Found' });
            }
            res.status(200).json({
                clients: client, 
                message: "Successfully Retrieved" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    updateById: async (req, res) => {
        try {
            const client = await clientModel.findByIdAndUpdate(
                req.params.id,
                { $set: {
                    name: req.body.name,
                    email: req.body.email,
                    country: req.body.country,
                    city: req.body.city,
                    state: req.body.state,
                    zip: req.body.zip,
                  }
                },
                { new: true }
            )
            if (client == null) {
                return res.status(404).json({ message: 'Client Not Found' });
            }
            res.status(200).json({ 
                clients: client, 
                message: "Successfully Updated" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    deleteById: async (req, res) => {
        try {
            const client = await clientModel.findByIdAndDelete(req.params.id);
            if (client == null) {
                return res.status(404).json({ message: 'Client Not Found' });
            }
            res.status(200).json({ 
                clients: client, 
                message: "Successfully Deleted" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    }
}

module.exports = clientController;