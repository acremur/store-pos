const mongoose = require('mongoose')

const URL = process.env.MONGO_URI

mongoose.connect(URL)

let connectionObj = mongoose.connection

connectionObj.on('connected', () => console.log('Mongo DB connection succesfull'))
connectionObj.on('error', () => console.log('Mongo DB connection failed'))

module.exports = {}