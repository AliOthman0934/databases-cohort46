require("./db");

require("./table/creatAuthorTable");

require("./table/createAuthor_ResearchTable");

const insertAuthors = require("./insert/insertAuthorsData");

const insertAuthorsPapers = require("./insert/insertResearchPapersData");

const printAuthorsMentors = require("./query/printAuthorsMentors");

const printAuthorsPapers = require("./query/printAuthorsPapers");

const aggregateFunctions = require("./Aggregate_Functions/queries");


insertAuthors();

insertAuthorsPapers();

printAuthorsMentors();

printAuthorsPapers();

aggregateFunctions();
