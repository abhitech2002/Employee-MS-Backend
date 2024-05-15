const mongoose = require('mongoose');

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

const Designation = mongoose.model('Designation', designationSchema);

module.exports = Designation;
