const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require('../../models/user/model');
const companyModel = require('../../models/company/model');

const authController = {
    signup: async (req, res) => {
        try {
            const companyId = '65c687c66ec327c1dae9041f';
            const hashedPassword = await bcrypt.hash(req?.body?.password, 10);
            const newUser = new userModel({
                name: req?.body?.name,
                email: req?.body?.email,
                password:  hashedPassword,
            })

            const populatedUser = await newUser.save();
            
             await companyModel.updateOne({ _id: companyId }, {
                $push: { users: populatedUser._id }
            });
            res.status(200).json({ 
                message: "Successfully Inserted New User"
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({ 
                message: "There was a Server Side Error",
                error: error.message 
            })
        }
    },
    login: async (req, res) => {
        try {
            const user = await userModel.findOne({ email: req.body.email });

            if (user) {
                const isValidPassword = await bcrypt.compare(
                    req.body.password, user.password
                );
                if (isValidPassword) {
                   // generate token
                    const token = jwt.sign({
                      userEmail: user.email,
                      userRole: user.role,
                    }, process.env.JWT_SECRET,
                    {expiresIn: '1h'}
                    );
                    res.status(200).json({ 
                      access_token: token,
                      message: "Login Successful!"
                    })
                } else {
                    res.status(401).json({error: "Authentication Failed!"})
                }
            } else {
                res.status(401).json({error: "Authentication Failed!"})
            } 
        } catch (error) {
         res.status(500).json({message: "There was a Server Side Error"})
        }
    },
}

module.exports = authController;