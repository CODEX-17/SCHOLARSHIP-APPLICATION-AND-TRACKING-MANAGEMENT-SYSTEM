const express = require('express')
const router = express.Router()
const db = require('../db')
const { v4: uuidv4 } = require('uuid');

//generates a unique identifier
const generateUniqueId = () => {
    return uuidv4();
}

const nodemailer = require('nodemailer');
const emailPassword = 'sokb hpyq oevl gmkl';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'librarysmart69@gmail.com',
      pass: emailPassword
    }
});

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

//GET REQUEST JOIN WITH ACCOUNT AND PROFILE
router.get('/getRequestJoinProfileJoinAccount', (req, res) => {

    const query = `
    SELECT 
    r.request_id,
    r.request_type,
    r.date AS request_date,
    r.time AS request_time,
    r.request_status,
    r.archived,
    p.*,
    a.*
FROM 
    requests r
INNER JOIN 
    profile p ON r.user_id = p.user_id
INNER JOIN 
    accounts a ON r.user_id = a.user_id;
    `;
    
    db.query(query, (error, result) => {
        if (error) {
            console.log('Failed to get request and account data:', error);
            return res.status(400).send({ message: 'Failed to retrieve data', error });
        }

        console.log('Successfully retrieved request and account data:')
        res.status(200).json(result)
    });
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
})

router.post('/addRequest', async (req, res) => {

    const { 
        user_id, 
        program_id
    } = req.body

    console.log(req.body)

    try {
   
        const queryRequest = `
           INSERT INTO requests(
            request_id, request_type,
            user_id, program_id, 
            date, time, request_status, archived 
           ) VALUES(?, ?, ?, ?, CURDATE(), CURTIME(), ?, ?)
        `

        const requestAdd = new Promise((resolve, reject) => {
            db.query(queryRequest,[generateUniqueId(), 'program', user_id, program_id, 'pending', false], (error, result) => {
                if (error) {
                    console.log('Failed to add request:', error)
                    reject('Failed to add request')
                }
        
                console.log('Successfully added')
                resolve('Successfully added')
            })
        })

        const queryAccount = `UPDATE accounts SET apply_status = ?, program_id = ? WHERE user_id =?`

        const accountUpdateStatus = new Promise((resolve, reject) => {
            db.query(queryAccount,['pending', program_id, user_id], (error, result) => {
                if (error) {
                    console.log('Failed to update account:', error)
                    reject('Failed to update account')
                }
        
                console.log('Successfully update account.')
                resolve('Successfully update account.')
            })
        })

        const queryProfile = `UPDATE profile SET program_id = ? WHERE user_id = ?`

        const profileUpdateStatus = new Promise((resolve, reject) => {
            db.query(queryProfile,[program_id, user_id], (error, result) => {
                if (error) {
                    console.log('Failed to update profile:', error)
                    reject('Failed to update profile')
                }
        
                console.log('Successfully update profile.')
                resolve('Successfully update profile.')
            })
        })

        const mailOptions = {
            to: email,
            from: 'librarysmart69@gmail.com',
            subject: 'Scholarship Application Received',
            text: `Thank you for submitting your scholarship application. We have successfully received your application, and it is currently under review by our administration team.
        
        Please note that the approval process may take some time, and we will notify you once a decision has been made. Until then, we appreciate your patience.
        
        If you have any questions or need further assistance, feel free to contact us.
        
        Best regards,
        The Administration Team`
        };
      
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: 'Error sending email' });
            }
            res.status(200).json({ message: 'Reset email sent' });
        });

        await Promise.all([requestAdd, accountUpdateStatus, profileUpdateStatus])
        res.status(200).json({
            message: 'Successfully submit request.'
        })

    } catch (error) {
        console.log('Server error:', error)
        res.status(400).json({
            message: 'Failed to submit request.'
        })
    }

    
})

router.patch('/updateRequestStatus', async (req, res) => {

    const { 
        action,
        request_id,
        user_id,
        program_id,
    } = req.body

    try {
   
        //REQUEST QUERY
        const queryRequest = `
           UPDATE requests SET request_status = ? WHERE request_id = ?
        `

        const requestUpdate = new Promise((resolve, reject) => {
            db.query(queryRequest,[action, request_id], (error, result) => {
                if (error) {
                    console.log('Failed to update request:', error)
                    reject('Failed to update request')
                }
        
                console.log('Successfully update request.')
                resolve('Successfully update request.')
            })
        })

        //ACCOUNT QUERY
        const accountStatus = action === 'approved' ? 'applied' : 'free'
        const updatedProgramID = action === 'approved' ? program_id : null
        const queryAccount = `UPDATE accounts SET apply_status = ?, program_id = ? WHERE user_id =?`

        const accountUpdate = new Promise((resolve, reject) => {
            db.query(queryAccount,[accountStatus, updatedProgramID, user_id], (error, result) => {
                if (error) {
                    console.log('Failed to update account:', error)
                    reject('Failed to update account')
                }
        
                console.log('Successfully update account.')
                resolve('Successfully update account.')
            })
        })

        //PROFILE QUERY
        const queryProfile = `UPDATE profile SET program_id = ? WHERE user_id = ?`

        const profileUpdate = new Promise((resolve, reject) => {
            db.query(queryProfile,[updatedProgramID, user_id], (error, result) => {
                if (error) {
                    console.log('Failed to update profile:', error)
                    reject('Failed to update profile')
                }
        
                console.log('Successfully update profile.')
                resolve('Successfully update profile.')
            })
        })

        await Promise.all([requestUpdate, accountUpdate, profileUpdate])
        res.status(200).json({
            message: 'Successfully update request status.'
        })

    } catch (error) {
        console.log('Server error:', error)
        res.status(400).json({
            message: 'Failed to update request status.'
        })
    }

    
})

router.patch('/archivedRequest/:request_id', async (req, res) => {

    const { request_id } = req.params

    try {
   
        //REQUEST QUERY
        const queryRequest = `
           UPDATE requests SET archived = true WHERE request_id = ?
        `
        db.query(queryRequest,[request_id], (error, result) => {
            if (error) {
                console.log('Failed to achive request:', error)
                res.status(200).json({
                    message: 'Failed achive request.'
                })
            }
    
            console.log('Successfully archived request.')
            res.status(200).json({
                message: 'Successfully achive request.'
            })
        })


    } catch (error) {
        console.log('Server error:', error)
        res.status(400).json({
            message: 'Failed to update request status.'
        })
    }

    
})


module.exports = router