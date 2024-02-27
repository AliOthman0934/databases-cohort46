const db = require("../db");

const insertResearchPapersData = () => {
    const researchPapersData = [
        { paper_id: 1, paper_title: 'Title 1', conference: 'Conference A', publish_date: '2022-01-01' },
        { paper_id: 2, paper_title: 'Title 2', conference: 'Conference B', publish_date: '2022-02-15' },
    ];

    const sql = "INSERT INTO research_Papers (paper_id, paper_title, conference, publish_date) VALUES ?";
    db.query(sql, [researchPapersData.map(Object.values)], (error, results) => {
        if (error) {
            console.log("Error inserting research papers data", error.message);
            return;
        }
        console.log(results.affectedRows + " row(s) inserted into research_Papers table");
    });
};

module.exports = insertResearchPapersData;
