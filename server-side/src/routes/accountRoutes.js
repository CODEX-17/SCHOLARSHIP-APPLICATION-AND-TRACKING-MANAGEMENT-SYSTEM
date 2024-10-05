const express = require('express')
const router = express.Router()
const crypto = require('crypto');
const db = require('../db')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const passwordHash = require('password-hash')
require('dotenv').config();

const nodemailer = require('nodemailer');
const emailPassword = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'librarysmart69@gmail.com',
      pass: emailPassword
    }
  });

const storageImage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storageImage });

// CreateAccounts
router.post('/createAccount', upload.single('file'), async (req, res) => {

    const { 
        card_number, 
        firstname, 
        middlename, 
        lastname, 
        contact, 
        email, 
        password, 
        acctype, 
        gender, 
        street_address, 
        birthdate, 
        city, 
        imageID
    } = req.body;

    const query = `
        INSERT INTO accounts(
            card_number, firstname, middlename, lastname, contact, email, password, 
            acctype, gender, street_address, birthdate, city, imageID
        ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    try {
        const hashedPassword = passwordHash.generate(password);

        console.log(hashedPassword)

        db.query(query, [
            card_number, firstname, middlename, lastname, contact, email, 
            hashedPassword, acctype, gender, street_address, birthdate, city, imageID
        ], (error, data, field) => {
            if (error) {
                console.log(error);
                return res.status(400).send(error);
            }

            // If there's an image file
            if (req.file) {
                const queryImage = 'INSERT INTO image(filename, path, imageID) VALUES(?,?,?)';
                const { filename, path } = req.file;

                db.query(queryImage, [filename, path, imageID], (error, data, field) => {
                    if (error) {
                        console.log(error);
                        return res.status(400).send(error);
                    }

                    return res.status(200).json({
                        message: 'Successfully created account with image.'
                    });
                });
            } else {
                res.status(200).json({
                    message: 'Successfully created account.'
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

// Update account
router.post('/updateAccount', upload.single('file'), async (req, res) => {

    const {
        id,
        firstname, 
        middlename, 
        lastname, 
        contact, 
        gender, 
        street_address, 
        birthdate, 
        city, 
        imageID
    } = req.body;

    const query = `
        UPDATE accounts SET firstname=?, middlename=?, lastname=?, contact=?, gender=?, street_address=?, birthdate=?, city=?, imageID=? WHERE id=?
    `;

    try {

        db.query(query, [firstname, middlename, lastname, contact, gender, street_address, birthdate, city, imageID, id], (error, data, field) => {
            if (error) {
                console.log(error);
                return res.status(400).send(error);
            }

            // If there's an image file
            if (req.file) {
                const queryImage = 'INSERT INTO image(filename, path, imageID) VALUES(?,?,?)';
                const { filename, path } = req.file;

                db.query(queryImage, [filename, path, imageID], (error, data, field) => {
                    if (error) {
                        console.log(error);
                        return res.status(400).send(error);
                    }

                    return res.status(200).json({
                        message: 'Successfully created account with image.'
                    });
                });
            } else {
                res.status(200).json({
                    message: 'Successfully created account.'
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});


//Check Hash
router.post('/checkAccount', async (req, res) => {

    const {email, password} = req.body
    console.log(req.body)
    const query = 'SELECT * FROM accounts WHERE email=?'

    try {
        const [user] = await new Promise((resolve, reject) => {
            db.query(query, [email], (error, data, field) => {
                if (error) return reject(error)
                resolve(data)
            })
        })

        
        if (user) {
           const hashPassword = user.password 
       
            if (hashPassword) {
                console.log('result:' + passwordHash.verify(password, hashPassword))
                if (passwordHash.verify(password, hashPassword)) {
                    return res.status(200).send(user)
                } else {
                    console.log(false)
                    return res.status(400).send(false)
                }
            }
            
        }else {
            return res.status(400).send(false)
        }

    } catch (error) {
        console.log(error)
    }

})

//Change password with hash
router.post('/changePassword', async (req, res) => {

    const {email, newPassword} = req.body

    const hashedPassword = passwordHash.generate(newPassword);

    const query = 'UPDATE accounts SET password=? WHERE email=?'

    db.query(query, [hashedPassword, email], (error, data, field) => {
        if (error) {
            console.log(error)
            res.status(400).send(error)
        }

        console.log('Successfully update password.')
        res.status(200).json({
            message: 'Successfully update password.'
        })
    })
})

//Forget password
router.post('/forgotPassword', async (req, res) => {
    const { email } = req.body;
    console.log(email)

    try {

    const [user] = await new Promise((resolve, reject) => {
        db.query("SELECT * FROM accounts WHERE email=?", [email], (error, data, field) => {
            if (error) return reject(error)
            resolve(data)
        })
    })

      if (user.length < 0) {
        console.log('User not found')
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate a reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpires = Date.now() + 3600000; // 1 hour from now
  
      // Save the token and expiry date in the database
      await db.query('UPDATE accounts SET reset_token = ?, reset_token_expires = ? WHERE email = ?', [resetToken, resetTokenExpires, email]);
  
      // Send reset email
      const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
      const mailOptions = {
        to: email,
        from: 'librarysmart69@gmail.com',
        subject: 'Password Reset',
        text: `You requested a password reset. Please click this link to reset your password: ${resetUrl}`
      }; 
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ message: 'Error sending email' });
        }
        res.status(200).json({ message: 'Reset email sent' });
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
    }
});

router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    console.log(token, password)

    try {

     const [user] = await new Promise((resolve, reject) => {
        db.query('SELECT * FROM accounts WHERE reset_token = ? AND reset_token_expires > ?', [token, Date.now()], (error, data, field) => {
            if (error) return reject(error)
            resolve(data)
        })
     })


     console.log(user)

      if (user.length < 0) {
        return res.status(400).json({ message: 'Token is invalid or has expired' });
      }
  
      // Hash new password and update database
      const hashedPassword = await passwordHash.generate(password);
      await db.query('UPDATE accounts SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE reset_token = ?', [hashedPassword, token]);
  
      res.status(200).json({ message: 'Password has been reset' });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
    }
});

router.get('/getAccounts', async (req, res) => {

    const query = 'SELECT * FROM accounts'

    db.query(query, (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            res.status(200).json(data)
        }
    })
  
});

module.exports = router