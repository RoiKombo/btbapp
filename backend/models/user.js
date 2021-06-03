const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    id: Number,
    email: String,
    phone: Number,
    date_of_birth: Date,
    company_name: String,
    business_number: Number,
    bank_account: [{
        bank_name: String,
        branch: Number,
        account: Number,
    }],
    password: Number,
    last_login: Date,
    token: String,
    own: String,  
    loan_size: Number,
    return_time: Number,
});

module.exports = mongoose.model('User', userSchema);