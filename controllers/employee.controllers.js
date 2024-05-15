const Employee = require('../models/employee.model');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 2000000 }, 
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('documentUpload');

function checkFileType(file, cb) {
    const filetypes = /pdf|doc|docx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Documents Only!');
    }
}

exports.createEmployee = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).json({ message: err });
        } else {
            if (req.file == undefined) {
                res.status(400).json({ message: 'No file selected!' });
            } else {
                const { name, email, code, designation, department, workLocation, workExperience, educationDetails, reportingManager } = req.body;
                const documentUpload = req.file.path;

                const newEmployee = new Employee({
                    name,
                    email,
                    code,
                    designation,
                    department,
                    workLocation,
                    workExperience,
                    educationDetails,
                    reportingManager,
                    documentUpload,
                });

                newEmployee.save()
                    .then(employee => res.json(employee))
                    .catch(err => res.status(400).json({ message: err.message }));
            }
        }
    });
};


// Get
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find()
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id)
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update
exports.updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};