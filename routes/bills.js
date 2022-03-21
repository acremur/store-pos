const router = require('express').Router()
const Bill = require('../models/Bill')

router.get('/', async (req, res) => {
    try {
        const bills = await Bill.find()
        res.status(200).send(bills)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const newBill = new Bill(req.body)
        await newBill.save()
        res.status(201).send('Bill charged successfully')
    } catch (error) {
        res.status(400).json(error)
    }
})
    
module.exports = router 