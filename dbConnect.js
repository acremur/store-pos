const mongoose = require('mongoose')

const URL = process.env.MONGO_URI

mongoose.connect(URL)
.then(() => console.log('Mongo DB connection succesfull'))
.catch(() => console.log('Mongo DB connection failed'))