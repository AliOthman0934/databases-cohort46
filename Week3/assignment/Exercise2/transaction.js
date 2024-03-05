const mysql = require("./db")

    db.beginTransaction((transactionError) => {
        if (transactionError) {
            console.error("Error beginning transaction:", transactionError.message);
            return db.end();
        }

        const transferAmount = 1000.00;
        const fromAccount = 101;
        const toAccount = 102;

        const updateFromAccountBalance = `
        UPDATE account SET balance = balance - ? WHERE account_number = ?
    `;
        const updateToAccountBalance = `
        UPDATE account SET balance = balance + ? WHERE account_number = ?
    `;

        // Insert change records into 'account_changes'
        const insertChangeRecordFromAccount = `
        INSERT INTO account_changes (account_number, amount, remark)
        VALUES (?, ?, 'Transfer to account ${toAccount}')
    `;
        const insertChangeRecordToAccount = `
        INSERT INTO account_changes (account_number, amount, remark)
        VALUES (?, ?, 'Transfer from account ${fromAccount}')
    `;

        // Execute queries within the transaction
        db.query(updateFromAccountBalance, [transferAmount, fromAccount], (error) => {
            if (error) {
                return db.rollback(() => {
                    console.error("Error updating 'account' balance:", error.message);
                    db.end();
                });
            }

            db.query(updateToAccountBalance, [transferAmount, toAccount], (error) => {
                if (error) {
                    return db.rollback(() => {
                        console.error("Error updating 'account' balance:", error.message);
                        db.end();
                    });
                }

                db.query(insertChangeRecordFromAccount, [fromAccount, transferAmount], (error) => {
                    if (error) {
                        return db.rollback(() => {
                            console.error("Error inserting change record:", error.message);
                            db.end();
                        });
                    }

                    db.query(insertChangeRecordToAccount, [toAccount, transferAmount], (error) => {
                        if (error) {
                            return db.rollback(() => {
                                console.error("Error inserting change record:", error.message);
                                db.end();
                            });
                        }

                        // Commit the transaction
                        db.commit((commitError) => {
                            if (commitError) {
                                return db.rollback(() => {
                                    console.error("Error committing transaction:", commitError.message);
                                    db.end();
                                });
                            }

                            console.log("Transaction complete. Amount transferred successfully.");

                            // Close the database connection after the transaction
                            db.end();
                        });
                    });
                });
            });
        });
    });
