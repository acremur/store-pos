const router = require('express').Router()
const Item = require('../models/Items')
const itemsData = require('../data.json')
    
router.get('/', async (req, res) => {
    try {
        const items = await Item.find()
        res.status(200).send(items)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const newItem = new Item(req.body)
        await newItem.save()
        res.status(201).send('Item added successfully')
    } catch (error) {
        res.status(400).json(error)
    }
})

router.put('/:id', async (req, res) => {
    try {
        await Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.send('Item updated successfully')
    } catch (error) {
        res.status(400).json(error)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id)
        res.send('Item deleted successfully')
    } catch (error) {
        res.status(400).json(error)
    }
})

router.get('/inject', async (req, res) => {
    try {
        await Item.deleteMany()
        await Item.insertMany(itemsData)
        res.status(200).send('Items succesfully inserted!')
    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong' })
    }
})
    
module.exports = router 