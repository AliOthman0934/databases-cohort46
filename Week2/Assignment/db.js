const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
});

db.connect(error => {
    if (error) {
        console.log("Error connacting to mysql", error.message)
        return;
    }
    console.log("mysql is conncted");
});

module.exports = db;

