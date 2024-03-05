const mysql = require("./db");

const insertAccountData = `
    INSERT INTO account (account_number, balance)
    VALUES
        (101, 5000.00),
        (102, 7500.00)
    `;


const insertAccountChangesData = `
    INSERT INTO account_changes (account_number, amount, remark)
    VALUES
        (101, 500.00, 'Initial deposit'),
        (102, 750.00, 'Initial deposit')
    `;


db.query(insertAccountData, (error) => {
    if (error) {
        console.error("Error inserting data into 'account' table:", error.message);
        return;
    }

    db.query(insertAccountChangesData, (error) => {
        if (error) {
            console.error("Error inserting data into 'account_changes' table:", error.message);
            return;
        }

        console.log("Sample data is inserted");

        db.end();
    });
});
