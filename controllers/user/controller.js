const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require('../../utilities/cloudinary');

const userModel = require('../../models/user/model');
const companyModel = require('../../models/company/model');

const userController = {
    create: async (req, res) => {
        try {
            const companyId = '65c687c66ec327c1dae9041f';
            const hashedPassword = await bcrypt.hash(req?.body?.password, 10);
            let imageUrl = '';
            if (req?.file?.path) {
                const result = await cloudinary.uploader.upload(req?.file?.path);
                imageUrl = result?.secure_url;
            }
            const existUser = await userModel.findOne({ email: req?.body?.email });

            if(!existUser){
                const newUser = new userModel({
                    name: req?.body?.name,
                    email: req?.body?.email,
                    password: hashedPassword,
                    country: req?.body?.country,
                    city: req?.body?.city,
                    state: req?.body?.state,
                    zip: req?.body?.zip,
                    address: `${req?.body?.city}, ${req?.body?.state}, ${req?.body?.country}, ${req?.body?.zip}`,  
                    role: req?.body?.role,
                    image: imageUrl,
                })
                const populatedUser = await newUser.save();
                await companyModel.updateOne({ _id: companyId }, {
                    $push: { users: populatedUser._id }
                });
                res.status(200).json({ 
                    message: "Successfully Inserted New User",
                })
            }else{
                const updatedUser = await userModel.findOneAndUpdate(
                    { email: req.body?.email }, 
                    { $set: {
                        name: req?.body?.name,
                        email: req?.body?.email,
                        password: hashedPassword,
                        country: req?.body?.country,
                        city: req?.body?.city,
                        state: req?.body?.state,
                        zip: req?.body?.zip,
                        address: `${req?.body?.city}, ${req?.body?.state}, ${req?.body?.country}, ${req?.body?.zip}`,  
                        role: req?.body?.role,
                        image: imageUrl,
                  }
                },{ new: true })

                res.status(200).json({ 
                    message: "Successfully updated existing user",
                })
            }
        } catch (error) {
            console.log(error);   
            res.status(500).json({ 
                message: "There was a Server Side Error",
                error: error 
            })
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
            res.status(500).json({ message: "There was a Server Side Error" })
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
                user: user, 
                message: "Successfully Retrieved" 
            })
        } catch (error) {
            res.status(500).json({ message: "There was a Server Side Error" })
        }
    },
    updateById: async (req, res) => {
        try {
            const updatedUser = {
                    name: req?.body?.name,
                    email: req?.body?.email,
                    country: req?.body?.country,
                    city: req?.body?.city,
                    state: req?.body?.state,
                    zip: req?.body?.zip,
                    role: req?.body?.role,
                  }

                if (req?.body?.password) {
                    updatedUser.password = await bcrypt.hash(req?.body?.password, 10);
                }   
                if (req?.file?.path) {
                    const result = await cloudinary.uploader.upload(req?.file?.path);
                    updatedUser.image = result?.secure_url;
                }

            const user = await userModel.findByIdAndUpdate(
                req.params.id,
                { $set: updatedUser},
                { new: true }
            );
            if (user == null) {
                return res.status(404).json({ message: 'User Not Found' });
            }
            res.status(200).json({ 
                user: user, 
                message: "Successfully Updated" 
            })
        } catch (error) {
            res.status(500).json({ message: "There was a Server Side Error" })
        }
    },
    deleteById: async (req, res) => {
        try {
            const user = await userModel.findByIdAndDelete(req.params.id);
            if (user == null) {
                return res.status(404).json({ message: 'User not Found' });
            }
            res.status(200).json({ 
                user: user, 
                message: "Successfully Deleted" 
            })
        } catch (error) {
            res.status(500).json({ message: "There was a Server Side Error" })
        }
    }
}

module.exports = userController;