const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganisationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true
    },
    phone:{
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    }
});

module.exports = Organisation = mongoose.model('organisation', OrganisationSchema);
