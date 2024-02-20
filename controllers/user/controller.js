const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require('../../utilities/cloudinary');

const userModel = require('../../models/user/model');
const companyModel = require('../../models/company/model');

const userController = {
    create: async (req, res) => {
        try {
            const companyId = '65c687c66ec327c1dae9041f';
            // const url = req.protocol + '://' + req.get('host');
            const hashedPassword = await bcrypt.hash(req?.body?.password, 10);
            const result = await cloudinary.uploader.upload(req?.file?.path);
            const newUser = new userModel({
                name: req?.body?.name,
                email: req?.body?.email,
                password: hashedPassword,
                country: req?.body?.country,
                city: req?.body?.city,
                state: req?.body?.state,
                zip: req?.body?.zip,
                address: req?.body?.city + ', ' + req?.body?.state + ', ' + req?.body?.country + ', ' + req?.body?.zip,  
                role: req?.body?.role,
                image: result?.secure_url,
                // image: url + '/public/' + req?.file?.filename,
            });
        const populatedUser = await newUser.save();
         await companyModel.updateOne({ _id: companyId }, {
            $push: { users: populatedUser._id }
        });
         res.status(200).json({ 
            // user: newUser, 
            message: "Successfully Inserted New User"
        })
        } catch (error) {
         console.log(error);   
         res.status(500).json({ 
            message: "Thare was a Server Side Error",
            error: error 
         })
        }
    },
    login: async (req, res) => {
        try {
            const user = await userModel.find({ email: req.body.email });

            if (user && user.length > 0) {
                const isValidPassword = await bcrypt.compare(
                    req.body.password, user[0].password
                );
                if (isValidPassword) {
                   // generate token
                    const token = jwt.sign({
                      userEmail: user[0].email,
                      userRole: user[0].role,
                    }, process.env.JWT_SECRET,
                    // {expiresIn: '1h'}
                    );
                    res.status(200).json({ 
                      access_token: token,
                      message: "Login Successful!"
                    })
                } else {
                    res.status(401).json({error: "Authetication Failed!"})
                }
            } else {
                res.status(401).json({error: "Authetication Failed!"})
            } 
        } catch (error) {
         res.status(500).json({message: "Thare was a Server Side Error"})
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
                user: user, 
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
                    password: req.body.password,
                    country: req.body.country,
                    city: req.body.city,
                    state: req.body.state,
                    zip: req.body.zip,
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
                user: user, 
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
                user: user, 
                message: "Successfully Deleted" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    }
}

module.exports = userController;