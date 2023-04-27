const request = require('supertest')
const {app} = require('../app/app.js')
const  db = require('../db/connection.js')
const data = require('../src/data/TechTestData.js')
const seed = require('../seed/seed.js')



beforeEach(() => {
    return seed(data)
});

afterAll(() => {
    db.end()
})


describe('GET request', () => {
    test('responds with status 200', () => {
        return request(app)
        .get('/api/data')
        .expect(200)
    })
    test('200 : responds with correct data object', () => {
        return request(app)
        .get('/api/data')
        .expect(200)
        .then((result) => {
            const {body} = result
            const data = body.data
            const datapoint = data[0]
            expect (datapoint).toHaveProperty('id')
            expect (datapoint).toHaveProperty('title')
            expect (datapoint).toHaveProperty('description')
            expect (datapoint).toHaveProperty('candidateid')
            expect (datapoint).toHaveProperty('candidatename')
            expect (datapoint).toHaveProperty('date')
            expect (datapoint).toHaveProperty('locationname')
            expect (datapoint).toHaveProperty('longitude')
            expect (datapoint).toHaveProperty('latitude')

        })

    })
    test('200 : responds with correct data in descing order initially', () => {
        return request (app)
        .get('/api/data')
        .expect(200)
        .then((result) => {
            const {body} = result
            const data = body.data
            const datapoint = data[0]
            expect(datapoint).toHaveProperty('id', 20)
        })
    })
})

describe('testing QUERIES', () => {
    test('200: responds with correct data in ascending order', () => {
        return request (app)
        .get('/api/data?order=asc')
        .expect(200)
        .then((result) => {
            const {body} = result
            const data = body.data
            const datapoint = data[0]
            expect(datapoint).toHaveProperty('id',1)
        })
    })
    test('200: testing candidatename sortby', () => {
        return request (app)
        .get('/api/data?sort_by=CandidateName')
        .expect(200)
        .then((result) => {
            const {body} = result
            const data = body.data
            const datapointLast = data[0]
            const datapointFirst = data[19]
            expect(datapointLast).toHaveProperty('candidatename', 'Wilmers')
            expect(datapointFirst).toHaveProperty('candidatename', 'Donnelly')
        })
    })
    test('200: testing locationname sortby', () => {
        return request (app)
        .get('/api/data?sort_by=LocationName')
        .expect(200)
        .then((result) => {
            const {body} = result
            const data = body.data
            console.log(data)
            const datapointLast = data[0]
            const datapointFirst = data[19]
            expect(datapointLast).toHaveProperty('locationname', 'Woking')
            expect(datapointFirst).toHaveProperty('locationname', 'Berlin')
        })
    })
    test('200: testing candidatename search', () => {
        return request (app)
        .get('/api/data?CandidateName=Wilmers')
        .expect(200)
        .then((result) => {
            const {body} = result
            const data = body.data
            data.forEach((datapoint) => {
                expect(datapoint).toHaveProperty('candidatename', 'Wilmers')
            })
        })
    })
    test('200: testing candidatename search', () => {
        return request (app)
        .get('/api/data?LocationName=London')
        .expect(200)
        .then((result) => {
            const {body} = result
            const data = body.data
            data.forEach((datapoint) => {
                expect(datapoint).toHaveProperty('locationname', 'London')
            })
        })
    })
    test('200: testing combination queries', () => {
        return request (app)
        .get('/api/data?order=asc&sort_by=Date&CandidateName=Wilmers&LocationName=London')
        .expect(200)
        .then((result) => {
            const {body} = result
            const data = body.data
            data.forEach((datapoint) => {
                expect(datapoint).toHaveProperty('locationname', 'London')
                expect(datapoint).toHaveProperty('candidatename', 'Wilmers')
            })
        })
    })
    test('200: search by id', () => {
        return request(app)
        .get('/api/data?Id=1')
        .expect(200)
        .then((result) => {
            const {body} = result
            const data = body.data
            const datapoint = data[0]
            expect(datapoint).toHaveProperty('id', 1)
            expect(datapoint).toHaveProperty('title', 'VICTVS1')
        })
    })
})