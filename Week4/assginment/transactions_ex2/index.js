const setAccounts = require("./setup");
const transfer = require("./transaction");

async function main() {
    try {
        await setAccounts();

        // Transfer 1000 from account 101 to account 102
        await transfer(
            101,
            102,
            1000,
            "Transferring 1000 from account 101 to account 102"
        );
    } catch (error) {
        console.error("Error:", error);
    }
}

main();