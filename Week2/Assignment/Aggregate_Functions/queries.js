const db = require("./db");


const queries = [
    `
    SELECT research_Papers.paper_id, research_Papers.paper_title, COUNT(authorResearch.author_id) AS num_authors
    FROM research_Papers
    LEFT JOIN authorResearch ON research_Papers.paper_id = authorResearch.research_id
    GROUP BY research_Papers.paper_id, research_Papers.paper_title;
    `,

    `
    SELECT authors.gender, COUNT(authorResearch.research_id) AS num_papers
    FROM authors
    LEFT JOIN authorResearch ON authors.author_id = authorResearch.author_id
    WHERE authors.gender = 'F'
    GROUP BY authors.gender;
    `,

    `
    SELECT authors.university, AVG(authors.h_index) AS avg_h_index
    FROM authors
    GROUP BY authors.university;
    `,

    `
    SELECT authors.university, COUNT(authorResearch.research_id) AS num_papers
    FROM authors
    LEFT JOIN authorResearch ON authors.author_id = authorResearch.author_id
    GROUP BY authors.university;
    `,

    `
    SELECT authors.university, MIN(authors.h_index) AS min_h_index, MAX(authors.h_index) AS max_h_index
    FROM authors
    GROUP BY authors.university;
    `
    `
    SELECT authors.gender, research_Papers.paper_id, research_Papers.paper_title, COUNT(DISTINCT authorResearch.author_id) AS num_authors
    FROM research_Papers
    LEFT JOIN authorResearch ON research_Papers.paper_id = authorResearch.research_id
    JOIN authors ON authors.author_id = authorResearch.author_id
    WHERE authors.gender = 'F'
    GROUP BY authors.gender, research_Papers.paper_id, research_Papers.paper_title;
    `,

    `
    SELECT authors.university, research_Papers.paper_id, research_Papers.paper_title, COUNT(DISTINCT authorResearch.author_id) AS num_authors
    FROM research_Papers
    LEFT JOIN authorResearch ON research_Papers.paper_id = authorResearch.research_id
    JOIN authors ON authors.author_id = authorResearch.author_id
    WHERE authors.university IS NOT NULL
    GROUP BY authors.university, research_Papers.paper_id, research_Papers.paper_title;
    `,
];


const executeQueries = () => {
    queries.forEach((query, index) => {
        db.query(query, (error, results) => {
            if (error) {
                console.log(`Error executing Query ${index + 1}`, error.message);
                return;
            }
            console.log(`Query ${index + 1} Results:`);
            console.log(results);
        });
    });
};

module.exports = executeQueries;

