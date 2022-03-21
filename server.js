require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const dbConnect = require('./dbConnect')
const itemsRoutes = require('./routes/items')
const usersRoutes = require('./routes/users')
const billsRoutes = require('./routes/bills')

app.use(express.json())
// app.get('/', (req, res) => res.send('Welcome to MERN Stack Retail Store POS Application Backend!'))
app.use('/api/items', itemsRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/bills', billsRoutes)

app.use('/', express.static(path.join(__dirname, './client/build')))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build/index.html'))
})

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Node JS Server running on port ${port}`))