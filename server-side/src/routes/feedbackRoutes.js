const express = require('express')
const router = express.Router()
const db = require('../db')

//API get branch
router.post('/addFeedback', (req, res) => {

    const { message, date, time } = req.body
    const query = 'INSERT INTO feedback(message, date, time) VALUES(?,?,?)'

    db.query(query,[message, date, time], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log('Successfully submitted feedback.')
            res.status(200).json({ message: 'Successfully submitted feedback.' })
        }
    })
})

module.exports = router