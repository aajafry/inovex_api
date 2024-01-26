const employeeModel = require('../../models/employee_deprecated/model');

const employeeController = {
    create: async (req, res) => {
        const newEmployee = new employeeModel(req.body)
        try {
         await newEmployee.save();
         res.status(200).json({ 
            employee: newEmployee, 
            message: "Successfully Inserted New Employee"
        })
        } catch (error) {
         res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    getAll: async (req, res) => {
        try {
            const employee = await employeeModel.find()
              .populate('orders')
              .populate('quotations')
              .populate('tickets')
              .exec();
            res.status(200).json({ 
                employees: employee, 
                message: "Successfully Retrieved" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    findById: async (req, res) => {
        try {
            const employee = await employeeModel.findById(req.params.id)
              .populate('orders')
              .populate('quotations')
              .populate('tickets')
              .exec();
            if (employee == null) {
                return res.status(404).json({ message: 'Employee Not Found' });
            }
            res.status(200).json({ 
                employee: employee, 
                message: "Successfully Retrieved" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    updateById: async (req, res) => {
        try {
            const employee = await employeeModel.findByIdAndUpdate(
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
            if (employee == null) {
                return res.status(404).json({ message: 'Employee Not Found' });
            }
            res.status(200).json({ 
                employee: employee, 
                message: "Successfully Updated" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    },
    deleteById: async (req, res) => {
        try {
            const employee = await employeeModel.findByIdAndDelete(req.params.id);
            if (employee == null) {
                return res.status(404).json({ message: 'Employee not Found' });
            }
            res.status(200).json({ 
                employee: employee, 
                message: "Successfully Deleted" 
            })
        } catch (error) {
            res.status(500).json({ message: "Thare was a Server Side Error" })
        }
    }
}

module.exports = employeeController;