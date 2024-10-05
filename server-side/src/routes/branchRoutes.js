const express = require('express')
const router = express.Router()
const db = require('../db')

//API get branch
router.get('/getBranch', (req, res) => {

    const query = 'SELECT * FROM branch'

    db.query(query, (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            res.status(200).json(data)
        }
    })
})

module.exports = router