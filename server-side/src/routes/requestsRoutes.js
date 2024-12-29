const express = require('express')
const router = express.Router()
const db = require('../db')

//API ALL REQUEST
router.get('/getAllRequest', (req, res) => {

    const query = 'SELECT * FROM requests'

    db.query(query, (error, data, field) => {
        if (error) {
            console.error('Failed to get table requests.')
            res.status(404).send(error)
        } 

            console.error('Successfully to get table requests.')
            res.status(200).json(data)
        
    })
})


//GET REQUEST JOIN WITH ACCOUNT
router.get('/getRequestJoinAccount', (req, res) => {

    const query = `
       SELECT 
    requests.request_id,
    requests.request_type,
    requests.date,
    requests.time,
    requests.request_status,
    accounts.user_id,
    accounts.firstname,
    accounts.middlename,
    accounts.lastname,
    accounts.email,
    accounts.contact,
    accounts.address,
    accounts.type,
    accounts.profile_pic
FROM 
    accounts
LEFT JOIN 
    requests 
ON 
    accounts.user_id = requests.user_id
    `;
    
    db.query(query, (error, result) => {
        if (error) {
            console.log('Failed to get request and account data:', error);
            return res.status(400).send({ message: 'Failed to retrieve data', error });
        }

        console.log('Successfully retrieved request and account data:', result);
        res.status(200).json(result);
    });
});


module.exports = router