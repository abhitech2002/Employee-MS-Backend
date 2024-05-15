const Designation = require('../models/designation.mode');

// Get all 
exports.getAllDesignations = async (req, res) => {
  try {
    const designations = await Designation.find();
    res.json(designations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get 
exports.getDesignationById = async (req, res) => {
  try {
    const designation = await Designation.findById(req.params.id);
    if (!designation) {
      return res.status(404).json({ message: 'Designation not found' });
    }
    res.json(designation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create
exports.createDesignation = async (req, res) => {
  const designation = new Designation({
    name: req.body.name,
    description: req.body.description,
    count: req.body.count
  });

  try {
    const newDesignation = await designation.save();
    res.status(201).json(newDesignation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update 
exports.updateDesignation = async (req, res) => {
  try {
    const designation = await Designation.findById(req.params.id);
    if (!designation) {
      return res.status(404).json({ message: 'Designation not found' });
    }

    designation.name = req.body.name;
    designation.description = req.body.description;
    designation.count = req.body.count

    const updatedDesignation = await designation.save();
    res.json(updatedDesignation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete
exports.deleteDesignation = async (req, res) => {
  try {
    const designation = await Designation.findByIdAndDelete(req.params.id);
    if (!designation) {
      return res.status(404).json({ message: 'Designation not found' });
    }
    res.json({ message: 'Designation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
