const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Account = require('./models/Account');

dotenv.config();

async function transfer(senderAccountNumber, receiverAccountNumber, amount, remark) {
    try {
        await mongoose.connect(process.env.CONN_STR, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB successfully!');

        const sender = await Account.findOne({ account_number: senderAccountNumber });
        const receiver = await Account.findOne({ account_number: receiverAccountNumber });

        if (!sender || !receiver) {
            console.log('Account not found.');
            return;
        }

        const senderChangeNumber = sender.account_changes.length > 0 ? sender.account_changes[sender.account_changes.length - 1].change_number + 1 : 1;
        const receiverChangeNumber = receiver.account_changes.length > 0 ? receiver.account_changes[receiver.account_changes.length - 1].change_number + 1 : 1;

        // Update balances & add changes to account_changes array
        await Account.updateOne(
            { account_number: senderAccountNumber },
            {
                $inc: { balance: -amount },
                $push: {
                    account_changes: {
                        change_number: senderChangeNumber,
                        amount: -amount,
                        changed_date: new Date(),
                        remark,
                    },
                },
            }
        );

        await Account.updateOne(
            { account_number: receiverAccountNumber },
            {
                $inc: { balance: amount },
                $push: {
                    account_changes: {
                        change_number: receiverChangeNumber,
                        amount,
                        changed_date: new Date(),
                        remark,
                    },
                },
            }
        );

        console.log(`Transfer of ${amount} from account ${senderAccountNumber} to account ${receiverAccountNumber} was successful!`);
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.connection.close();
    }
}

module.exports = transfer;
