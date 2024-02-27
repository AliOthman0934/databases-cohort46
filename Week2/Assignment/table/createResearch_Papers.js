const db = require("./db");

db.query(`CREATE TABLE IF NOT EXISTS research_Papers (
    paper_id INT NOT NULL AUTO_INCREMENT,
    paper_title VARCHAR(255),
    conference VARCHAR(255), 
    publish_date DATE,
    PRIMARY KEY (paper_id)
)`, (error) => {
    if (error) {
        console.log("Error creating research_Papers", error.message);
        return;
    }
    console.log("Research_Papers table is created");
});