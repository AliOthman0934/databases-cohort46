const db = require("../db");

const printAuthorsMentors = () => {
    const query = `
        SELECT a.author_name AS author, m.author_name AS mentor
        FROM authors a
        LEFT JOIN authors m ON a.mentor = m.author_id;
    `;

    db.query(query, (error, results) => {
        if (error) {
            console.log("Error fetching data", error.message);
            return;
        }

        console.log("Names of Authors and their Mentors:");
        results.forEach(row => {
            console.log(`${row.author} -> ${row.mentor || 'No Mentor'}`);
        });
    });
};

module.exports = printAuthorsMentors;
