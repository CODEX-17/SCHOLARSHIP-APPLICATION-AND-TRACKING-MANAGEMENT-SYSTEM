const express = require('express')
const router = express.Router()
const db = require('../db')
const { v4: uuidv4 } = require('uuid');

//generates a unique identifier
const generateUniqueId = () => {
    return uuidv4();
};

//API get programs
router.get('/getPrograms', (req, res) => {

    const query = 'SELECT * FROM programs'

    db.query(query, (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            res.status(200).json(data)
        }
    })
})

//API get programs by id
router.get('/getProgramsByID', (req, res) => {

    const query = 'SELECT * FROM programs'

    db.query(query, (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            res.status(200).json(data)
        }
    })
})

//API get programs
router.post('/addPrograms', (req, res) => {

    const { program_name, program_desc, limit_slot } = req.body

    const query = `INSERT INTO programs(
    program_id, program_name, 
    program_desc, total_applicant, 
    limit_slot, available_slot,
    program_status, renewal, date, time
    ) VALUES(?,?,?,?,?,?,?,?,CURDATE(), CURTIME())`

    db.query(query,[
        generateUniqueId(), program_name, 
        program_desc, 0, 
        limit_slot, limit_slot,
        'active', false
    ], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log('Successfully added program.')
            res.status(200).json({
                message: 'Successfully added program.'
            })
        }
    })
})

//API get programs
router.post('/updatePrograms', (req, res) => {

    const { program_desc, program_name, program_status, program_id } = req.body
    const query = 'UPDATE programs SET program_desc=?, program_name=?, program_status=? WHERE program_id=?'

    db.query(query,[program_desc, program_name, program_status, program_id], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log('Successfully update program.')
            res.status(200).json({
                message: 'Successfully update program.'
            })
        }
    })
})

//API delete programs
router.post('/deletePrograms', (req, res) => {

    const { id } = req.body
    const query = 'DELETE FROM programs WHERE program_id = ?'

    db.query(query,[id], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log('Successfully delete program.')
            res.status(200).json({
                message: 'Successfully delete program.'
            })
        }
    })
})

module.exports = router