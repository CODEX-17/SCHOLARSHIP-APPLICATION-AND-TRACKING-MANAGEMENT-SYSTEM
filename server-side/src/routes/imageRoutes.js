const express = require('express')
const router = express.Router()
const db = require('../db')

//API get quiz
router.get('/getImageByImageID/:imageID', (req, res) => {
    const { imageID } = req.params

    console.log(req.body)
    const query = 'SELECT * FROM image WHERE imageID=?'

    db.query(query,[imageID], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            res.status(200).json(data)
        }
    })
})

module.exports = router