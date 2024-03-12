const mongoose = require("mongoose");
const fs = require("fs");
const csv = require("csv-parser");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

// Define the CSV schema
const csvSchema = new mongoose.Schema({
    Country: {
        type: String
    },
    Year: {
        type: String
    },
    Age: {
        type: String
    },
    M: {
        type: String
    },
    F: {
        type: String
    }
});

// Define the CSV model
const CsvModel = mongoose.model("databaseWeek4", csvSchema);

async function connectDatabase() {
    try {
        await mongoose.connect(process.env.CONN_STR, {});
        console.log("DB connection successful");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

async function readCSVFile() {
    return new Promise((resolve, reject) => {
        const result = [];

        fs.createReadStream("../homework/ex1-aggregation/population_pyramid_1950-2022.csv")
            .pipe(csv())
            .on("data", (data) => result.push(data))
            .on("end", () => {
                resolve(result);
            })
            .on("error", (error) => {
                reject(`Error reading CSV file: ${error.message}`);
            });
    });
}

async function insertCsv() {
    try {
        await CsvModel.create(result);
        console.log("Data successfully imported");
    } catch (err) {
        console.log(err.message);
    }
}

async function getTotalPopulationByYear(country) {
    try {
        const result = await CsvModel.aggregate([
            {
                $match: { Country: country }
            },
            {
                $group: {
                    _id: "$Year",
                    countPopulation: {
                        $sum: { $add: ["$M", "$F"] }
                    }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        return result;
    } catch (error) {
        console.error("Error calculating total population:", error);
        throw error;
    }
};

async function getContinentInfoByYearAndAge(year, age) {
    try {
        const result = await CsvModel.aggregate([
            {
                $match: { Year: parseInt(year), Age: age }
            },
            {
                $group: {
                    _id: "$Country",
                    Year: { $first: "$Year" },
                    Age: { $first: "$Age" },
                    M: { $sum: "$M" },
                    F: { $sum: "$F" },
                    TotalPopulation: { $sum: { $add: ["$M", "$F"] } }
                }
            }
        ]);

        return result;
    } catch (error) {
        console.error("Error retrieving continent information:", error);
        throw error;
    }
}

async function main() {
    await connectDatabase();

    try {
        await readCSVFile();
        await insertCsv();
        await getTotalPopulationByYear("Netherlands");
        await getContinentInfoByYearAndAge("2022","100+s")
    } catch (error) {
        console.error(error);
    } finally {
        mongoose.connection.close();
    }
}

main();








