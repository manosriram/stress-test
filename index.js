const express = require("express");
const PORT = 5000;
const app = express();
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "stress"
});
const {
    uniqueNamesGenerator,
    adjectives,
    colors,
    animals
} = require("unique-names-generator");

const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals]
}); // big_red_donkey

connection.connect();

app.get("/", async (req, res) => {
    for (let t = 0; t < 50000; ++t) {
        const shortName = uniqueNamesGenerator({
            dictionaries: [adjectives, animals, colors], // colors can be omitted here as not used
            length: 2
        }); // big-donkey
        connection.query(
            "insert into stressTable(name) values(?)",
            [shortName],
            (err, result) => {
                if (err) res.send(err);
            }
        );
    }
    res.send("DONE!");
});

app.listen(PORT, () => console.log(`Server at ${PORT}`));

module.exports = app;
