const db = require("../db");

db.query(`CREATE TABLE IF NOT EXISTS authorResearch (
    author_id INT,
    research_id INT,
    FOREIGN KEY (author_id) REFERENCES authors (author_id),
    FOREIGN KEY (research_id) REFERENCES research_Papers (paper_id),
    PRIMARY KEY (author_id, research_id),
    ON UPDATE CASCADE,
    ON DELETE CASCADE
)`, (error) => {
    if (error) {
        console.log("Error creating authorResearch table", error.message);
        return;
    }
    console.log("AuthorResearch table is created");
});
