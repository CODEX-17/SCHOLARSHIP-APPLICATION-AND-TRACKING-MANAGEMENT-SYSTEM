const express = require('express')
const router = express.Router()
const pool = require('../db')
const passwordHash = require('password-hash')
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const multer = require('multer');

const nodemailer = require('nodemailer');
const emailPassword = 'sokb hpyq oevl gmkl';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'librarysmart69@gmail.com',
      pass: emailPassword
    }
});

//generates a unique identifier
const generateUniqueId = () => {
    return uuidv4();
};

//Check Hash
router.post('/checkAccounts', async (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM accounts WHERE email=?';

    try {
        // Fetch the user by email
        const [user] = await new Promise((resolve, reject) => {
            pool.query(query, [email], (error, data) => {
                if (error) {
                    console.log(error);
                    return reject(error);
                }
                console.log(data);
                resolve(data);
            });
        });

        if (user) {
            const hashPassword = user.password;
            // Verify password hash
            if (passwordHash.verify(password, hashPassword)) {
                // Send user data as response
                return res.status(200).json({
                    user_id: user.user_id,
                    email: user.email,
                    type: user.type,
                    username: user.username,
                    image: user.filename,
                    // other fields you may need to return
                });
            } else {
                console.log('Password mismatch');
                return res.status(400).json({ message: 'Invalid credentials' });
            }
        } else {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

    } catch (error) {
        console.log('Error in /checkAccount:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

//Get all emails in db
router.get('/getAllEmails', (req, res) => {
    const query = 'SELECT email FROM accounts'

    pool.query(query, (error, result) => {
        if (error) {
            console.log(error)
            res.status(400).send(error)
        }

        res.status(200).json(result)
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

//Create account
router.post('/createAccount', upload.single('file'), (req, res) => {
    const { email, password, username } = req.body;
    const profilePic = req.file ? req.file.filename : 'default';

    const query = 'INSERT INTO accounts(user_id, email, password, username, type, filename) VALUES(?,?,?,?,?,?)';

    pool.query(query, [generateUniqueId(), email, passwordHash.generate(password), username, 'user', profilePic], (error, result) => {
        if (error) {
            console.error(error)
            res.status(400).send(error)
        } else {

            if (profilePic !== 'default') {
                const fileSql = `
                    INSERT INTO files (filename, date, time, file_path, file_id)
                    VALUES (?, CURDATE(), CURTIME(), ?, ?)
                `;

                const fileValues = [profilePic, `/uploads/${profilePic}`, generateUniqueId()];
                pool.query(fileSql, fileValues, (error, result) => {
                    if (error) {
                        console.error(error);
                        res.status(400).send(error)
                    } else {
                        console.log('Account created successfully.')
                        res.status(200).json({ message: 'Account created successfully.' })
                    }
                })
            }else {
                console.log('Account created successfully.')
                res.status(200).json({ message: 'Account created successfully.' })
            }
            
        }
    })

});

router.post('/deleteProfiles', (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Profile ID is required' });
    }

    const query = 'DELETE FROM profile WHERE profile_id=?';

    pool.query(query, [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).send({ message: 'Error deleting profile' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        console.log('Successfully deleted profile.');
        return res.status(200).json({ message: 'Successfully deleted profile.' });
    });
});

router.post('/updateStatusProfile', (req, res) => {
    const { id, status, firstname, email } = req.body;

    if (!id || !status || !firstname || !email) {
        return res.status(400).json({ message: 'The data is not properly sending.' });
    }

    const query = 'UPDATE profile SET status=? WHERE profile_id=? ';

    pool.query(query, [status, id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).send({ message: 'Error updating profile' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        const mailOptions = {
            to: email,
            from: 'librarysmart69@gmail.com',
            subject: 'Congratulations! Your Scholarship Application is Approved',
            text: `Hi ${firstname},
          
                    Congratulations!
                    
                    We are excited to inform you that after reviewing your application, you have met all the necessary requirements and have been officially selected as a scholar in our program.
                    
                    Your application has been approved by the admin, and we are thrilled to welcome you to the scholarship community. 
                    
                    Please stay tuned for further instructions regarding the next steps. If you have any questions or need additional information, don't hesitate to reach out to us.
                    
                    Once again, congratulations, and we look forward to seeing all the great things you will accomplish!
                    
                    Best regards,  
                    Admin`
          };
           
      
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              return res.status(500).json({ message: 'Error sending email' });
            }
    
            console.log('Successfully update Status.');
            res.status(200).json({ message: 'Successfully update Status.' });
    
          });

        
    });
});

module.exports = router