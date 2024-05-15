const mongoose = require('mongoose');

// Define Designation Schema
const designationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  }
});

// Create Designation model
const Designation = mongoose.model('Designation', designationSchema);

module.exports = Designation;
