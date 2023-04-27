const {fetchData} = require('../models/appModels.js')
const {fetchSpecificData} = require('../models/appModels.js')

const getData = (request, response, next) => {
    const candidatename = request.query.CandidateName
    const locationname = request.query.LocationName
    const id = request.query.Id
    const sort_by = request.query.sort_by
    const order = request.query.order
    return fetchData(order, sort_by, candidatename, locationname, id).then((data) => {
        response.status(200).send({data})
    })
    .catch((error) => {
        console.log(error)
        next (error)
    })
}

const getSpecificData = (request, response, next) => {
    const {id} = request.params
    return fetchSpecificData(id).then((data) => {
        response.status(200).send({data})
    })
    .catch((error) => {
        next (error)
    })
}

module.exports = {getData, getSpecificData}