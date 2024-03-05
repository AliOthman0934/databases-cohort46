const mysql = require("./db");

const createAccountTable = `
    CREATE TABLE IF NOT EXISTS account (
        account_number INT PRIMARY KEY,
        balance DECIMAL(10, 2) DEFAULT 0.00
    )
    `;

const createAccountChangesTable = `
    CREATE TABLE IF NOT EXISTS account_changes (
        change_number INT PRIMARY KEY AUTO_INCREMENT,
        account_number INT,
        amount DECIMAL(10, 2),
        changed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        remark VARCHAR(255),
        FOREIGN KEY (account_number) REFERENCES account(account_number)
    )
    `;

db.query(createAccountTable, (error) => {
    if (error) {
        console.error("Error creating 'account' table:", error.message);
        return;
    }
    console.log(" 'account' table is created");

    db.query(createAccountChangesTable, (error) => {
        if (error) {
            console.error("Error creating 'account_changes' table:", error.message);
            return;
        }
        console.log("'account_changes' table is created");

        db.end();
    });
});

