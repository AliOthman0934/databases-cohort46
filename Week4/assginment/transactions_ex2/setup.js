const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Account = require('./models/Account');

dotenv.config();

async function setAccounts() {
    try {
        await mongoose.connect(process.env.CONN_STR, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB successfully!');

        // Clean accounts
        await Account.deleteMany();

        // Insert account data
        await Account.insertMany([
            { account_number: 101, balance: 5000.0, account_changes: [] },
            { account_number: 102, balance: 3000.0, account_changes: [] },
        ]);

        console.log('Accounts setup completed successfully!');
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.connection.close();
    }
}

module.exports = setAccounts;
