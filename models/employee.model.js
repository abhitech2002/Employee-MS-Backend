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
    code: {
        type: String,
        required: true
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
    workLocation: {
        type: String,
        required: true
    },
    workExperience: {
        type: Number,
        required: true
    },
    educationDetails: {
        type: String,
        required: true
    },
    reportingManager: {
        type: String,
        required: true
    },
    educationDetails: {
        type: String,
        required: true
    },
    documentUpload: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = Employee = mongoose.model('employee', EmployeeSchema);
