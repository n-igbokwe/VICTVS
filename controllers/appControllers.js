const {fetchData} = require('../models/appModels.js')


const getData = (request, response, next) => {
    const candidatename = request.query.CandidateName
    const locationname = request.query.LocationName
    const sort_by = request.query.sort_by
    const order = request.query.order
    console.log(sort_by)
    return fetchData(order, sort_by, candidatename, locationname).then((data) => {
        response.status(200).send({data})
    })
    .catch((error) => {
        console.log(error)
        next (error)
    })
}

module.exports = {getData}