const express = require('express')
const router = express.Router()
const db = require('../db')

//API get branch
router.get('/getBooks', (req, res) => {

    const query = 'SELECT * FROM books'

    db.query(query, (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            res.status(200).json(data)
        }
    })
})

//delete
router.post('/deleteBooks', (req, res) => {

    const { book_id } = req.body

    const query = 'DELETE FROM books WHERE book_id=?'

    db.query(query,[book_id],  (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log('Successfully deleted book.')
            res.status(200).json({
                message: 'Successfully deleted book.'
            })
        }
    })
})

router.post('/addBook', (req, res) => {
    
    const { title,author_name,publication,genre,branch,total_copies } = req.body
    const query = 'INSERT INTO books(title,author_name,publication,genre,branch,total_copies) VALUES(?,?,?,?,?,?)'

    
    db.query(query,[title,author_name,publication,genre,branch,total_copies], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log('Successfully add book.')
            res.status(200).json('Successfully add book.')
        }
    })
})

router.post('/updateBooks', (req, res) => {
    
    const { title, authorName, publication, category, branch, totalCopies, bookID } = req.body
    const query = 'UPDATE books SET title=?,author_name=?,publication=?,genre=?,branch=?,total_copies=? WHERE book_id=?'

    db.query(query,[title, authorName, publication, category, branch, totalCopies, bookID], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log('Successfully update book.')
            res.status(200).json('Successfully update book.')
        }
    })
})

module.exports = router