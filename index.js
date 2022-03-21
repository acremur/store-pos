require('dotenv').config()
require('./dbConnect')
const express = require('express')
const path = require('path')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const itemsRoutes = require('./routes/items')
const usersRoutes = require('./routes/users')
const billsRoutes = require('./routes/bills')

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.get('/api/test', (req, res) => res.send('Welcome to MERN Stack Retail Store POS Application Backend!'))
app.use('/api/items', itemsRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/bills', billsRoutes)

app.use('/', express.static(path.join(__dirname, './client/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Node JS Server running on port ${port}`))