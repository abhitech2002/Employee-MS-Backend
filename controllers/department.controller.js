const Department = require('../models/department.model');

exports.getDepartment = async (req, res) => {
    try {
      const departments = await Department.find();
      res.json(departments);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


  exports.createDepartment = async (req, res) => {
    const department = new Department({
      name: req.body.name,
      headOfDepartment: req.body.headOfDepartment,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber
    });
  
    try {
      const newDepartment = await department.save();
      res.status(201).json(newDepartment);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };


// Update department
exports.updateDepartment = async (req, res) => {
    try {
      const department = await Department.findById(req.params.id);
      if (!department) {
        return res.status(404).json({ message: 'Department not found' });
      }
      department.name = req.body.name;
      department.headOfDepartment = req.body.headOfDepartment;
      department.email = req.body.email;
      department.phoneNumber = req.body.phoneNumber;
      const updatedDepartment = await department.save();
      res.json(updatedDepartment);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  // Delete department
exports.deleteDepartment = async (req, res) => {
    try {
      const department = await Department.findByIdAndDelete(req.params.id)
      if (!department) {
        return res.status(404).json({ message: 'Department not found' });
      }
      res.json({ message: 'Department deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


  // Get department by ID
exports.getDepartmentById = async (req, res) => {
    try {
      const department = await Department.findById(req.params.id);
      if (!department) {
        return res.status(404).json({ message: 'Department not found' });
      }
      res.json(department);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };