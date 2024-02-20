const cloudinary = require('../../utilities/cloudinary');
const companyModel = require('../../models/company/model');

const companyController = {
    create: async (req, res) => {
        try {
        //  const url = req.protocol + '://' + req.get('host')
         const result = await cloudinary.uploader.upload(req?.file?.path);
         const newCompany = new companyModel({
            ...req.body,
            logo: result?.secure_url,
            // logo: url + '/public/' + req?.file?.filename
         });
         await newCompany.save();
         res.status(200).json({ 
            company: newCompany,
            message: "Successfully Inserted New Company" 
        })
        } catch (error) {
         res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    getAll: async (req, res) => {
        try {
            const company = await companyModel.find()
            .populate("users")
            .populate("services")
            .populate("quotations")
            .populate("orders")
            .populate("tickets")
            .populate("invoices")
            .exec();
            res.status(200).json({
                company: company,
                message: "Successfully Retrieved"
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    findById: async (req, res) => {
        try {
            const company = await companyModel.findById(req.params.id)
                    .populate("users")
                    .populate("services")
                    .populate("quotations")
                    .populate("orders")
                    .populate("tickets")
                    .populate("invoices")
                    .exec(); 
            if (company == null) {
                return res.status(404).json({ message: 'Company not Found' });
            }
            res.status(200).json({
                company: company, 
                message: "Successfully Retrieved" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    updateById: async (req, res) => {
        try {
            const company = await companyModel.findByIdAndUpdate(
                req.params.id,
                { $set: {
                    name: req.body.name,
                    email: req.body.email,
                    country: req.body.country,
                    city: req.body.city,
                    state: req.body.state,
                    zip: req.body.zip,
                    logo: req.body.logo,
                  }
                },
                { new: true }
            )
            if (company == null) {
                return res.status(404).json({ message: 'Company Not Found' });
            }
            res.status(200).json({ 
                company: company, 
                message: "Successfully Updated" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    deleteById: async (req, res) => {
        try {
            const company = await companyModel.findByIdAndDelete(req.params.id);
            if (company == null) {
                return res.status(404).json({ message: 'Company Not Found' });
            }
            res.status(200).json({ 
                company: company, 
                message: "Successfully Deleted" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    }
}

module.exports = companyController;