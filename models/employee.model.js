const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    organisation: {
        type: Schema.Types.ObjectId,
        ref: 'organisation',
        required: true
    },
    department: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    reportingManager: {
        type: String,
        required: true
    },
    personalDetails: {
        type: String,
        required: true
    },
    documentUpload: {
        type: String,
        required: true
    }
});

module.exports = Employee = mongoose.model('employee', EmployeeSchema);
