const mongoose = require('mongoose');

const BankInfoSchema = new mongoose.Schema({
    PersonName: {
        type: String,
        required: [true, 'Person name is required'],
        trim: true,
        maxlength: [100, 'Person name cannot exceed 100 characters']
    },
    MobileNumber: {
        type: String,
        required: [true, 'Mobile number is required'],
        trim: true,
        minlength: [10, 'Mobile number must be at least 10 digits'],
        maxlength: [15, 'Mobile number cannot exceed 15 digits']
    },
    PanCard: {
        type: String,
        required: [true, 'PAN card number is required'],
        trim: true,
        minlength: [10, 'PAN card must be exactly 10 characters'],
        maxlength: [10, 'PAN card must be exactly 10 characters'],
        uppercase: true 
    },
    CardNumber: {
        type: String,
        required: [true, 'Card number is required'],
        trim: true,
        minlength: [16, 'Card number must be 16 digits'],
        maxlength: [16, 'Card number must be 16 digits']
    },
    CardDigit: {
        type: String,
        trim: true,
       
    },
    ExpiryDate: {
        type: String,
        required: [true, 'Expiry date is required'],
        trim: true,
        match: [/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Please enter a valid expiry date in MM/YY format'] 
    },
    Cvv: {
        type: String,
        required: [true, 'CVV is required'],
        trim: true,
        minlength: [3, 'CVV must be at least 3 digits'],
        maxlength: [4, 'CVV cannot exceed 4 digits']
    }
}, { timestamps: true });

module.exports = mongoose.model('BankInfo', BankInfoSchema);
