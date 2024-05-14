const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganisationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

module.exports = Organisation = mongoose.model('organisation', OrganisationSchema);
