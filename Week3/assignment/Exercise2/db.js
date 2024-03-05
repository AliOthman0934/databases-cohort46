const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Transactions",
});

db.connect((error) => {
    if (error) {
        console.error("Error connecting to MySQL:", error.message);
        return;
    }
    console.log("MySQL is connected");

    db.query(`CREATE DATABASE IF NOT EXISTS Transactions `, (error) => {
        if (error) {
            console.log("Error creating transactions database", error.message)
            return;
        }
        console.log("transactions database is created")
    });

    db.query(`USE Transactions`, (error) => {
        if (error) {
            console.log("Error switching to university database", error.message)
            return;
        }
        console.log("University database is accessed")
    });
});

module.exports = db;