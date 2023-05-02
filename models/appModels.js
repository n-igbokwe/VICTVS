const e = require('express');
const db = require('../db/connection.js')

const fetchData = (order = 'desc', sort_by = 'Date', candidatename, locationname, id, ) => {
    const greenlistedSortBys = ['CandidateName', 'Date', 'LocationName'];
    const greenlistedOrders = ['asc', 'desc'];

    let queryString = `SELECT * FROM data`;
    const params = [];

    if (id !== undefined) {
        queryString += ' WHERE id = $1';
        params.push(id);
    } else if (candidatename && locationname !== undefined ){
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


const fetchSpecificData = (id) => {
    const queryString = 'SELECT * FROM data WHERE id = $1;'
    const params = []

    if (typeof +id !== 'number'){
        return Promise.reject({status: 400, msg: 'BAD REQUEST'})
    } else {
        params.push(id)
    }

    return db.query(queryString, params).then(({rows}) => {
        return rows
    })
}
module.exports = {fetchData, fetchSpecificData}