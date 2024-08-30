const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    lastName: {
        type: String,
        trim:true,
        lowercase:true,
        required: [true, 'Last name is required'],
        maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    firstName: {
        type: String,
        trim:true,
        lowercase:true,
        required: [true, 'First name is required'],
        maxlength: [50, 'First name cannot exceed 50 characters']
    },
    city: {
        type: String,
        trim:true,
        lowercase:true,
        minlength: [3, 'City name should be at least 3 characters long'],
        maxlength: [100, 'City name cannot exceed 100 characters']
    },
}, { timestamps: true, versionKey: false });

const customerModel = mongoose.model('Customer', customerSchema);

module.exports = customerModel;
