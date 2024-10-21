const express = require('express')
const router = express.Router()
const pool = require('../db')
const passwordHash = require('password-hash')
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const multer = require('multer');

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

module.exports = router