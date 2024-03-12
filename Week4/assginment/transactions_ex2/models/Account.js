const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    account_number: {
        type: Number,
        required: true,
        unique: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    account_changes: [
        {
            change_number: {
                type: Number,
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            },
            changed_date: {
                type: Date,
                default: Date.now,
            },
            remark: String,
        },
    ],
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
