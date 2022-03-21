const router = require('express').Router()
const User = require('../models/User')

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).send(users)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.post('/register', async (req, res) => {
    try {        
        const newUser = new User({ ...req.body, verified: true })
        await newUser.save()
        res.status(201).send('User registered successfully')
    } catch (error) {
        res.status(400).json(error)
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ 
            userId: req.body.userId,
            verified: true
        })
        const isPasswordCorrect = await user.comparePassword(req.body.password)

        if (user && isPasswordCorrect) {
            res.status(200).send(user)
        } else {
            res.status(401).json({ message: 'Bad credentials. Revise user and password' })
        }      
    } catch (error) {
        res.status(400).json(error)
    }
})
    
module.exports = router 