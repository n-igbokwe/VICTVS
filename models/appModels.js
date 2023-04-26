const e = require('express');
const db = require('../db/connection.js')

const fetchData = (order = 'desc', sort_by = 'Date', candidatename, locationname ) => {
    const greenlistedSortBys = ['CandidateName', 'Date', 'LocationName'];
    const greenlistedOrders = ['asc', 'desc'];

    let queryString = `SELECT * FROM data`;
    const params = [];

    if (candidatename && locationname !== undefined ){
        queryString += ' WHERE CandidateName = $1 AND LocationName = $2';
        params.push(candidatename, locationname);
    } else {
        if (candidatename !== undefined && locationname === undefined){
            queryString += ' WHERE CandidateName = $1';
            params.push(candidatename);
        } else {
            if (candidatename === undefined && locationname !== undefined){
                queryString += ' WHERE LocationName = $1';
                params.push(locationname);
            } 
        }
    }

    if (!greenlistedSortBys.includes(sort_by) || !greenlistedOrders.includes(order)){
        return Promise.reject({status: 400, msg: 'BAD REQUEST'})
    } else {
        queryString += ` ORDER BY ${sort_by} ${order}`
        console.log(queryString)
        return db.query(queryString, params).then(({rows}) => {
            return rows;
        });
    }
}
module.exports = {fetchData}