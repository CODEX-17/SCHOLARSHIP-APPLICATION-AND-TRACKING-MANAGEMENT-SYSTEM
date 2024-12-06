const express = require('express')
const router = express.Router()
const path = require('path');
const multer = require('multer');
const db = require('../db')
const { v4: uuidv4 } = require('uuid');

//generates a unique identifier
const generateUniqueId = () => {
    return uuidv4();
};

//GET ANNOUNCEMENTS
router.get('/getAnnouncements', (req, res) => {

    const query = 'SELECT * FROM announcements'

    db.query(query, (error, data, field) => {
        if (error) {
            console.log(error)
            res.status(400).send(error)
        }

        if (data.length < 0) {
            res.status(200).json([])
        }

        console.log('Successfull get all announcements')
        res.status(200).json(data)
    })
})

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file names
    }
});

const upload = multer({ storage: storage });

//UPDATE ANNOUNCEMENTS
router.post('/updateAnnouncements', upload.single('anc_image'), (req, res) => {

    let { anc_id, anc_title, anc_content, anc_image } = req.body

    if (req.file) {
        anc_image = req.file && req.file.filename
    }
 
    const query = 'UPDATE announcements SET anc_title=?, anc_content=?, anc_image=? WHERE anc_id=?'
    
    db.query(query, [anc_title, anc_content, anc_image, anc_id], (error, data, field) => {
        if (error) {
            console.log(error)
            res.status(400).send(error)
        }

        console.log('Successfull update announcements')
        res.status(200).json({
            message: 'Successfull update announcements'
        })
    })
})

//ADD ANNOUNCEMENTS
router.post('/addAnnouncements', upload.single('anc_image'), (req, res) => {

    const anc_id = generateUniqueId()
    let anc_image = null

    let { anc_title, anc_content, date, time } = req.body

    if (req.file) {
        anc_image = req.file && req.file.filename
    }

    const query = 'INSERT INTO announcements(anc_id, anc_title, anc_content, anc_image, date, time) VALUES(?,?,?,?,?,?)'
    
    db.query(query, [anc_id, anc_title, anc_content, anc_image, date, time], (error, data, field) => {
        if (error) {
            console.log(error)
            res.status(400).send(error)
        }

        console.log('Successfull added announcements')
        res.status(200).json({
            message: 'Successfull added announcements'
        })
    })
})

//DELETE ANNOUNCEMENTS
router.post('/deleteAnnouncements', (req, res) => {
    
    const { anc_id } = req.body
    const query = 'DELETE FROM announcements WHERE anc_id = ?'
    
    db.query(query, [anc_id], (error, data, field) => {
        if (error) {
            console.log(error)
            res.status(400).send(error)
        }

        console.log('Successfully delete announcement.')
        res.status(200).json({
            message: 'Successfully delete announcement.'
        })
    })
})

module.exports = router