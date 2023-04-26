const format = require('pg-format')
const db = require('../db/connection')

const seed = (data) => {
    return db
        .query(`DROP TABLE IF EXISTS data;`)
        .then(() => {
            return db.query(`
            CREATE TABLE data (
            id SERIAL PRIMARY KEY,
            Title VARCHAR NOT NULL,
            Description VARCHAR NOT NULL,
            Candidateid INT,
            CandidateName VARCHAR NOT NULL,
            Date VARCHAR NOT NULL,
            LocationName VARCHAR NOT NULL,
            Latitude FLOAT,
            Longitude FLOAT
            );`);
        })
        .then(() => {
        const insertData = format('INSERT INTO data (Title, Description, Candidateid, CandidateName, Date, LocationName, Latitude, Longitude) VALUES %L;',
        data.map(({
            Title,
            Description,
            Candidateid,
            CandidateName,
            Date,
            LocationName,
            Latitude,
            Longitude
        }) => [Title, Description, Candidateid, CandidateName, Date, LocationName, Latitude, Longitude]
        )
        )
        return db.query(insertData)
        })
        // .catch((err) => {
        //     console.log(err)
        // })
};

module.exports = seed;