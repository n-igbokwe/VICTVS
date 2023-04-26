const e = require('express');
const express = require('express')


const {getData} = require('../controllers/appControllers.js')

const app = express();
app.use(express.json())

app.get('/api/data', getData)

app.use((error, request, response, next) => {
    if (error.status){
        response.status(error.status).send({msg:error.msg})
    } else {
        next(error)
        
    }
})

module.exports = {app}