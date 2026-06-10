require('dotenv').config();
const pgp = require('pg-promise')();

const connectionString = process.env.db_connection

const db = pgp(connectionString);

db.connect().then(obj => {
    console.log("Connected to db!");
    obj.done();
}).catch(error => {
        console.error("Error connecting the to the database: ", error.message || error);
    })

module.exports = db;
