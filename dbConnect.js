const mongoose = require('mongoose')

const URL = 'mongodb+srv://acremur:xDN9cJmYTps8PyFv@shey-pos.hmzos.mongodb.net/shay-pos?retryWrites=true&w=majority'

mongoose.connect(URL)
.then(() => console.log('Mongo DB connection succesfull'))
.catch(() => console.log('Mongo DB connection failed'))