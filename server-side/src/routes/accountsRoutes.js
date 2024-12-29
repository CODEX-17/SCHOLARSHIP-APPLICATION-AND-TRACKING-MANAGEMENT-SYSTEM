const express = require('express')
const router = express.Router()
const pool = require('../db')
const passwordHash = require('password-hash')
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const multer = require('multer');
const crypto = require('crypto');

const nodemailer = require('nodemailer');
const { rejects } = require('assert');
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

const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
const currentTime = new Date().toISOString().split('T')[1].split('.')[0]; // Format: HH:MM:SS


//Check Hash
router.post('/checkAccounts', async (req, res) => {
    const { email, password } = req.body;

    const query = `SELECT * FROM accounts WHERE email=? AND account_status='approved'`;

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
                    program_id: user.program_id,
                    email: user.email,
                    type: user.type,
                    firstname: user.firstname,
                    middlename: user.middlename,
                    lastname: user.lastname,
                    profile_pic: user.profile_pic,
                    apply_status: user.apply_status,
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

router.post('/createAccount', upload.fields([
    { name: 'valid_id', maxCount: 1 }, 
    { name: 'profile_pic', maxCount: 1 }
]), async (req, res) => {
    const { 
        firstname, 
        middlename, 
        lastname,
        contact,
        address,
        email, 
        password,
    } = req.body;

    const user_id = generateUniqueId()

    const validIdFile = req.files['valid_id'] ? req.files['valid_id'][0].filename : null;
    const validIdFilePath = req.files['valid_id'] ? req.files['valid_id'][0].path : null;
    const profilePicFile = req.files['profile_pic'] ? req.files['profile_pic'][0].filename : 'default';
    const profilePicPath = req.files['profile_pic'] ? req.files['profile_pic'][0].path : null;

    console.log(req.body)
    console.log(req.files)

    const hashedPassword = passwordHash.generate(password);  // Hash the password

    const insertAccountQuery = `
        INSERT INTO accounts(
            user_id, program_id, firstname, middlename, lastname, 
            address, contact, email, password, type, 
            valid_id, profile_pic, apply_status, account_status
        ) 
        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    const fileSql = `
        INSERT INTO files (filename, date, time, file_path, file_id, user_id)
        VALUES (?, CURDATE(), CURTIME(), ?, ?, ?)`


    const requestSql = `INSERT INTO requests(
    request_id, request_type, 
    user_id, application_id, 
    date, time, request_status ) 
    VALUES(?, ?, ?, ?, CURDATE(), CURTIME())`
    
    try {
        // Insert the account into the 'accounts' table
        await new Promise((resolve, reject) => {
            pool.query(insertAccountQuery, [
                user_id,
                null,  // If program_id is optional, pass null or provide a value if needed
                firstname,
                middlename,
                lastname,
                address,
                contact,
                email,
                hashedPassword,
                'user', 
                validIdFile,
                profilePicFile,
                'free',
                'pending'
            ], (error, result) => {
                if (error) {
                    console.log('Failed to insert account.', error);
                    reject('Failed to insert account.');
                }
                console.log('Successfully inserted account.');
                resolve(result);
            });
        });

        await new Promise((resolve, reject) => {
            pool.query(requestSql, [
                generateUniqueId(),
                'account',
                generateUniqueId(),
                null,
                'pending'
            ], (error, result) => {
                if (error) {
                    console.log('Failed to insert request.', error);
                    reject('Failed to insert request.');
                }
                console.log('Successfully inserted request.');
                resolve(result);
            });
        });

        // Insert profile picture file if it exists
        if (profilePicFile !== 'default') {
            await new Promise((resolve, reject) => {
                pool.query(fileSql, [profilePicFile, profilePicPath, generateUniqueId(), user_id], (error, result) => {
                    if (error) {
                        console.log('Failed to insert profile picture in file table.', error);
                        reject(error);
                    }
                    console.log('Successfully inserted profile picture in file table.');
                    resolve(result);
                });
            });
        }

        // Insert valid ID file if it exists
        if (validIdFile) {
            await new Promise((resolve, reject) => {
                pool.query(fileSql, [validIdFile, validIdFilePath, generateUniqueId(), user_id], (error, result) => {
                    if (error) {
                        console.log('Failed to insert valid ID in file table.', error);
                        reject(error);
                    }
                    console.log('Successfully inserted valid ID in file table.');
                    resolve(result);
                });
            });
        }
        

        console.log('Successfully created account.');
        res.status(200).json({ message: 'Successfully created account.' });

    } catch (error) {
        console.log('Failed server to create account.', error);
        res.status(400).json({ error: error.message });
    }
});

//UPDATE ACCOUNT
router.post('/updateAccounts', upload.single('image'), (req, res) => {

    const { username, email, user_id, image } = req.body
    console.log(req.file)

    const filename = req.file ? req.file.filename : image

    const query = 'UPDATE accounts SET username=?, email=?, filename=? WHERE user_id=?'

    pool.query(query,[username, email, filename, user_id], (error, data) => {
        if (error) {
            console.log(error)
            res.status(500).send(error)
        }

        console.log('Successfully update account info.')
        res.status(200).json({
            message: 'Successfully update account info.',
            object: {
                username,
                email,
                filename,
            }
        })
    })
})

//GET ACCOUNT BY USER_ID
router.get('/getAcctByID', (req, res) => {
    const { user_id } = req.body
    const query = 'SELECT * FROM accounts WHERE user_id=?'

    pool.query(query,[user_id], (error, result) => {
        if (error) {
            console.log(error)
            res.status(400).send(error)
        }

        res.status(200).json(result)
    })
})


//Update the application status
router.post('/updateStatusProfile', async (req, res) => {

    const { profile_id, status, firstname, email, program_id, apply_status, user_id } = req.body
    const queryProfile = 'UPDATE profile SET status=? WHERE profile_id=?'
    const queryAccount = 'UPDATE accounts SET apply_status=? WHERE user_id=?'

    console.log(req.body)

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

    if (!profile_id || !status || !firstname || !email || !program_id || !apply_status) {
        return res.status(400).json({ message: 'The data is not properly sending.' });
    }

    try {
        
        const updatingProfileStatus = new Promise((resolve, reject) => {
            pool.query(queryProfile, [status, profile_id], (error, data) => {
                if (error) {
                    reject('Error updating the profile.')
                }else if (data.affectedRows === 0) {
                    reject('Profile not found.')
                }else {
                    resolve('Profile updated successfully.')
                }
            })
        })

        const sendingEmail = new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject('Error sending email')
                }else {
                    resolve('Email send successfully.')
                }
            })
        })

        const updatingAccountAppStatus = new Promise((resolve, reject) => {
            pool.query(queryAccount, [apply_status, user_id], (error, data) => {
                if (error) {
                    reject('Error updating the apply_status of account.')
                }else {
                    resolve('Successfully update the account apply_status')
                }
            })
        })

        await Promise.all([updatingProfileStatus, updatingAccountAppStatus, sendingEmail])
        res.status(200).json({ message: 'Successfully update application status.' })

    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
    
});

router.post('/updateApplyStatus', (req, res) => {

    const { apply_status, user_id } = req.body
    const query = 'UPDATE accounts SET apply_status=? WHERE user_id=?'

    pool.query(query, [apply_status, user_id], (error, data, field) => {
        if (error) {
            console.log(error)
            res.status(400).send(error)
        }

        console.log('Successfully update application status.')
        res.status(200).json({ message: 'Successfully update application status.' })
    })

})

router.post('/deleteProfiles', async (req, res) => {
    const { profile_id, user_id } = req.body;
  
    const queryProfile = 'DELETE FROM profile WHERE profile_id=?';
    const queryAccount = 'UPDATE accounts SET apply_status=?, program_id=? WHERE user_id=?'
  
    try {
  
      const deletingProfile = new Promise((resolve, reject) => {
          pool.query(queryProfile, [profile_id], (error, result) => {
            if (error) {
                console.log(error)
                reject('Error deleting profile.')
            }else{
                console.log('Successfully deleted profile.')
                resolve('Successfully deleted profile.')
            }
          })
      })
  
      const updatingAccount = new Promise((resolve, reject) => {
        pool.query(queryAccount, ['free', 'n/a', user_id], (error , result) => {
          if (error) {
            console.log(error)
            reject('Error updating account.')
          }else {
            console.log('Successfull updating account.')
            resolve('Successfull updating account.')
          }
        })
      })
  
      await Promise.all([deletingProfile, updatingAccount])
      console.log('Successfully deleted applications.')
      res.status(200).json({ message: 'Successfully deleted applications.' })
  
    } catch (error) {
      console.log(error)
      res.status(400).send(error)
    }
    
})

// Forget password
router.post('/forgotPassword', async (req, res) => {
    const { email } = req.body;
    console.log(email);

    try {
        // Wrap SELECT query in a promise
        const user = await new Promise((resolve, reject) => {
            pool.query("SELECT * FROM accounts WHERE email=?", [email], (error, data) => {
                if (error) return reject(error);
                resolve(data);
            });
        });

        if (user.length === 0) { // Correct condition for no user found
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour from now

        console.log('resetTokenExpires',resetTokenExpires)

        // Wrap UPDATE query in a promise
        await new Promise((resolve, reject) => {
            pool.query(
                'UPDATE accounts SET reset_token = ?, reset_token_expires = ? WHERE email = ?',
                [resetToken, resetTokenExpires, email],
                (error, results) => {
                    if (error) return reject(error);
                    resolve(results);
                }
            );
        });

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
      // Find user by token and check if token is valid
      const user = await new Promise((resolve, reject) => {
        pool.query('SELECT * FROM accounts WHERE reset_token = ? AND reset_token_expires > ?', [token, Date.now()], (error, data) => {
            if (error) {
                console.log('Error in getting user.')
                return reject(error)
            }
            resolve(data)
        })
      })
  
      if (user.length === 0) {
        console.log('Token is invalid or has expired')
        return res.status(400).json({ message: 'Token is invalid or has expired' });
      }
  
      // Hash the new password
      const hashedPassword = passwordHash.generate(password);
  
      // Update password and clear the reset token
      await new Promise ((resolve, reject) => {
        pool.query('UPDATE accounts SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE reset_token = ?', [hashedPassword, token], (error, data) => {
            if (error) {
                console.log('Error in updating account.')
                return reject(error)
            }
            resolve('Successfully update account info.')
        })
      })
  
      res.status(200).json({ message: 'Password has been reset' });

    } catch (error) {
      console.error('Error the API');
      res.status(500).json({ message: 'Server error' });
    }
});

router.get('/getAccountByUserID/:user_id', (req, res) => {

    const { user_id } = req.params
    const query = `SELECT * FROM accounts WHERE user_id=?`

    try {
        
        pool.query(query, [user_id], (error, data) => {
            if (error) {
                console.log('error in getting data form database', error)
                res.status(400).send(error)
            }

            res.status(200).json(data)
        })


    } catch (error) {
        console.log('server error', error)
        res.status(400).send(error)
    }
})

router.post('/updateAccountStatus', async (req, res) => {
    
    const queryAccount = `UPDATE accounts SET account_status=? WHERE user_id=?`
    const queryRequest = `UPDATE requests SET request_status=? WHERE request_id=?`

    const { user_id, account_status, request_id } = req.body

    try {
        
        const account = new Promise((resolve, reject) => {

            if (account_status === 'rejected') {
                
            }

            pool.query(queryAccount, [account_status, user_id], (error, result) => {
                if (error) {
                    console.log('Error in updating account info.', error)
                    reject('Error in updating account info.', error)
                }

                console.log('Successfully in updating account info.')
                resolve('Successfully in updating account info.')
            })
        })

        const request = new Promise((resolve, reject) => {
            pool.query(queryRequest, [account_status, request_id], (error, result) => {
                if (error) {
                    console.log('Error in updating request info.', error)
                    reject('Error in updating request info.', error)
                }

                console.log('Successfully in updating request info.')
                resolve('Successfully in updating request info.')
            })
        })
        
        await Promise.all([account, request])
        res.status(200).json({
            message: 'Successfully update account status.'
        })


    } catch (error) {
        console.log('Server error', error)
        res.status(400).send(error)
    }

    
})


module.exports = router