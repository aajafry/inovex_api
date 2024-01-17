const userModel = require('../../models/team/model');

const userController = {
    create: async (req, res) => {
        const newUser = new userModel(req.body)
        try {
         await newUser.save();
         res.status(200).json({ 
            users: newUser, 
            message: "Successfully Inserted New User"
        })
        } catch (error) {
         res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    getAll: async (req, res) => {
        try {
            const user = await userModel.find()
              .populate('orders')
              .populate('quotations')
              .populate('tickets')
              .exec();
            res.status(200).json({ 
                users: user, 
                message: "Successfully Retrieved" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    findById: async (req, res) => {
        try {
            const user = await userModel.findById(req.params.id)
              .populate('orders')
              .populate('quotations')
              .populate('tickets')
              .exec();
            if (user == null) {
                return res.status(404).json({ message: 'User Not Found' });
            }
            res.status(200).json({ 
                users: user, 
                message: "Successfully Retrieved" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    updateById: async (req, res) => {
        try {
            const user = await userModel.findByIdAndUpdate(
                req.params.id,
                { $set: {
                    name: req.body.name,
                    email: req.body.email,
                    role: req.body.role,
                    image: req.body.image,
                  }
                },
                { new: true }
            );
            if (user == null) {
                return res.status(404).json({ message: 'User Not Found' });
            }
            res.status(200).json({ 
                users: user, 
                message: "Successfully Updated" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    deleteById: async (req, res) => {
        try {
            const user = await userModel.findByIdAndDelete(req.params.id);
            if (user == null) {
                return res.status(404).json({ message: 'User not Found' });
            }
            res.status(200).json({ 
                users: user, 
                message: "Successfully Deleted" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    }
}

module.exports = userController;