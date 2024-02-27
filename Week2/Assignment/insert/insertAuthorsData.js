const db = require("../db");

const insertAuthorsData = () => {
    const authorsData = [
        { author_id: 1, author_name: 'John Doe', university: 'University A', date_of_birth: '1990-05-15', h_index: 20, gender: 'M' },
        { author_id: 2, author_name: 'Jane Smith', university: 'University B', date_of_birth: '1985-08-22', h_index: 15, gender: 'F' },
    ];

    const sql = "INSERT INTO authors (author_id, author_name, university, date_of_birth, h_index, gender) VALUES ?";
    db.query(sql, [authorsData.map(Object.values)], (error, results) => {
        if (error) {
            console.log("Error inserting authors data", error.message);
            return;
        }
        console.log(results.affectedRows + " row(s) inserted into authors table");
    });
};

module.exports = insertAuthorsData;
