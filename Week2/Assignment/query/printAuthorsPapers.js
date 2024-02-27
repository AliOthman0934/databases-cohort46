const db = require("../db");

const printAuthorsPapers = () => {
    const query = `
        SELECT a.*, COALESCE(rp.paper_title, 'No Paper') AS published_paper_title
        FROM authors a
        LEFT JOIN authorResearch ar ON a.author_id = ar.author_id
        LEFT JOIN research_Papers rp ON ar.research_id = rp.paper_id;
    `;

    db.query(query, (error, results) => {
        if (error) {
            console.log("Error fetching data", error.message);
            return;
        }

        console.log("Authors and Their Published Papers:");
        results.forEach(row => {
            console.log(row);
        });
    });
};

module.exports = printAuthorsPapers;
