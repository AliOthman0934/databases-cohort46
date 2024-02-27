const db = require("../db");

db.query(`CREATE DATABASE IF NOT EXISTS university`, (error) => {
    if (error) {
        console.log("Error creating university database", error.message)
        return;
    }
    console.log("University database is created")
});

db.query(`USE university`, (error) => {
    if (error) {
        console.log("Error switching to university database", error.message)
        return;
    }
    console.log("University database is accessed")
});

db.query(`CREATE TABLE IF NOT EXISTS authors(
        author_id INT NOT NULL AUTO_INCREMENT,
        author_name VARCHAR(255),
        university VARCHAR(255),
        date_of_birth DATE,
        h_index INT , 
        gender CHAR(1),
        PRIMARY KEY(author_id)

    )`, (error) => {
    if (error) {
        console.log("Error creating authors table", error.message)
        return;
    }
    console.log("Authors table is created")
});

db.query(`ALTER TABLE authors 
    ADD mentor INT,
    ADD CONSTRAINT authors_mentor
        FOREIGN KEY (mentor)
        REFERENCES authors (author_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE`, (error) => {
    if (error) {
        console.log("Error adding mentor column and foreign key", error.message);
        return;
    }
    console.log("Mentor column added with foreign key constraint");
});

