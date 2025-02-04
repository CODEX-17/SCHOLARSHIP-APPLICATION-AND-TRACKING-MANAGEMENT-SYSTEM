const express = require('express')
const router = express.Router()
const pool = require('../db')
const passwordHash = require('password-hash')
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const multer = require('multer');
const crypto = require('crypto');

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

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file names
    }
});

const upload = multer({ storage: storage });

//Check Hash
router.get('/getUpdatedAccountByUserID/:user_id', async (req, res) => {
    const { user_id } = req.params;
    console.log(user_id)
    const query = `SELECT * FROM accounts WHERE user_id=?`;

    try {
        // Fetch the user by email
        const [user] = await new Promise((resolve, reject) => {
            pool.query(query, [user_id], (error, data) => {
                if (error) {
                    console.log(error);
                    return reject(error);
                }
      
                resolve(data);
            });
        });

        if (user) {
            
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
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

    } catch (error) {
        console.log('Error in /checkAccount:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

//Check Hash
router.get('/getAccounts', async (req, res) => {

    const query = `SELECT * FROM accounts`;

    try {
        
       pool.query(query, (error, data) => {
        if (error) {
            console.log('Error getting the accounts:', error)
            res.status(400).send(error)
        }

        console.log('Succefully get all accounts.')
        res.status(200).json(data)
       })

    } catch (error) {
        console.log('Error in server:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

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
    user_id, program_id, 
    date, time, request_status ) 
    VALUES(?, ?, ?, ?, CURDATE(), CURTIME(), ?)`
    
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
                user_id,
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
        
        const mailOptions = {
            to: email,
            from: 'librarysmart69@gmail.com',
            subject: 'Account Creation Request Received',
            text: `Thank you for creating an account with us. We have received your account request and it is currently under review by our administration team.
        
        Please note that you will not be able to log in until your account has been approved by the admin. We will notify you once your account has been processed and approved.
        
        Thank you for your patience. If you have any questions, feel free to contact us.
        
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

        console.log('Successfully created account.');
        res.status(200).json({ message: 'Successfully created account.' });

    } catch (error) {
        console.log('Failed server to create account.', error);
        res.status(400).json({ error: error.message });
    }
});

//UPDATE ACCOUNT
router.post('/updateAccounts', upload.single('image'), async (req, res) => {

    const { 
        firstname, 
        middlename, 
        lastname, 
        email, 
        user_id, 
        image 
    } = req.body

    console.log(req.file)
    console.log(req.body)

    const filename = req.file ? req.file.filename : image

    const queryAccount = 'UPDATE accounts SET firstname=?, middlename=?, lastname=?, email=?, profile_pic=? WHERE user_id=?'
    const queryAccountValues = [firstname, middlename, lastname, email, filename, user_id]

    const processQuery = (query, values, type) => {
        return new Promise ((resolve, reject) => {
            pool.query(query, values, (error, data) => {
                if (error) {
                    console.log(`Error query ${type}:`, error)
                    reject(`Error query ${type}:`, error)
                }

                resolve(`Successfully query ${type}.`)
            })
        })
    }

    // File insertion query
    const insertFile = (file) => {

        if (!file) return Promise.resolve();

        const fileSql = `
            INSERT INTO files (filename, date, time, file_path, file_id)
            VALUES (?, CURDATE(), CURTIME(), ?, ?)
        `;

        const fileValues = [file?.filename, file?.path, generateUniqueId()];

        return new Promise((resolve, reject) => {

            pool.query(fileSql, fileValues, (error, result) => {
                if (error) {
                    console.error('Error in adding file:', error);
                    return reject({ message: 'Error in adding file', error });
                }

                console.log('Successfully added file.');
                resolve('Successfully added file.');
            });
        });
    };

    await Promise.all([
        processQuery(queryAccount, queryAccountValues),
        insertFile(req.file)
    ])

    console.log('Successfully update account info.')
    res.status(200).json({
        message: 'Successfully update account info.',
        object: {
            firstname, 
            middlename, 
            lastname,
            email,
            filename,
        }
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

    console.log(req.params)
    const query = `SELECT * FROM accounts WHERE user_id=?`

    try {
        
        pool.query(query, [user_id], (error, data) => {
            if (error) {
                console.log('error in getting data form database', error)
                res.status(400).send(error)
            }

            console.log('Successfully get account info.', data)
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

router.post(
    '/updateProfiles',
    upload.fields([
        { name: 'coe_file', maxCount: 1 },
        { name: 'brgy_indigency', maxCount: 1 },
        { name: 'cog_file', maxCount: 1 },
        { name: 'school_id', maxCount: 1 },
        { name: 'parent_id', maxCount: 1 },
        { name: 'certificate_of_registration_comelec', maxCount: 1 },
    ]),
    async (req, res) => {
        try {
            const {
                user_id,
                firstname,
                middlename,
                lastname,
                birthdate,
                gender,
                civil_status,
                current_address,
                permanent_address,
                contact,
                // Primary school information
                primary_school_name,
                primary_school_address,
                primary_school_year_attended,
                // Secondary school information
                secondary_school_name,
                secondary_school_address,
                secondary_school_year_attended,
                // Mother information
                mother_firstname,
                mother_middlename,
                mother_lastname,
                mother_current_address,
                mother_permanent_address,
                mother_contact_number,
                mother_registered_voter,
                mother_voting_years,
                // Father information
                father_firstname,
                father_middlename,
                father_lastname,
                father_current_address,
                father_permanent_address,
                father_contact_number,
                father_registered_voter,
                father_voting_years,
            } = req.body;

            // Retrieve file paths or fallback to existing ones
            const coe_file = req.files['coe_file'] ? req.files['coe_file'][0].filename : req.body.coe_file;
            const brgy_indigency = req.files['brgy_indigency'] ? req.files['brgy_indigency'][0].filename : req.body.brgy_indigency;
            const cog_file = req.files['cog_file'] ? req.files['cog_file'][0].filename : req.body.cog_file;
            const parent_id = req.files['parent_id'] ? req.files['parent_id'][0].filename : req.body.parent_id;
            const school_id = req.files['school_id'] ? req.files['school_id'][0].filename : req.body.school_id;
            const certificate_of_registration_comelec = req.files['certificate_of_registration_comelec']
                ? req.files['certificate_of_registration_comelec'][0].filename
                : req.body.certificate_of_registration_comelec;

            const file_id = generateUniqueId();

            // Update profile information
            const profileSql = `
                UPDATE profile SET
                    firstname = ?, middlename = ?, lastname = ?, birthdate = ?, gender = ?, civil_status = ?,
                    current_address = ?, permanent_address = ?, contact = ?,
                    primary_school_name = ?, primary_school_address = ?, primary_school_year_attended = ?,
                    secondary_school_name = ?, secondary_school_address = ?, secondary_school_year_attended = ?,
                    mother_firstname = ?, mother_middlename = ?, mother_lastname = ?,
                    mother_current_address = ?, mother_permanent_address = ?, mother_contact_number = ?, mother_registered_voter = ?, mother_voting_years = ?,
                    father_firstname = ?, father_middlename = ?, father_lastname = ?,
                    father_current_address = ?, father_permanent_address = ?, father_contact_number = ?, father_registered_voter = ?, father_voting_years = ?,
                    parent_id = ?, school_id = ?, cog_file = ?, brgy_indigency = ?, coe_file = ?, certificate_of_registration_comelec = ?
                WHERE user_id = ?
            `;
            const profileValues = [
                firstname,
                middlename,
                lastname,
                birthdate,
                gender,
                civil_status,
                current_address,
                permanent_address,
                contact,
                primary_school_name,
                primary_school_address,
                primary_school_year_attended,
                secondary_school_name,
                secondary_school_address,
                secondary_school_year_attended,
                mother_firstname,
                mother_middlename,
                mother_lastname,
                mother_current_address,
                mother_permanent_address,
                mother_contact_number,
                mother_registered_voter,
                mother_voting_years,
                father_firstname,
                father_middlename,
                father_lastname,
                father_current_address,
                father_permanent_address,
                father_contact_number,
                father_registered_voter,
                father_voting_years,
                parent_id,
                school_id,
                cog_file,
                brgy_indigency,
                coe_file,
                certificate_of_registration_comelec,
                user_id,
            ];

            const updateProfile = new Promise((resolve, reject) => {
                pool.query(profileSql, profileValues, (error, result) => {
                    if (error) {
                        console.error('Error in updating profile:', error);
                        return reject({ message: 'Error in updating profile', error });
                    }
                    resolve('Successfully updated profile.');
                });
            });

            // Insert new files
            const insertFile = (filename) => {
                if (!filename) return Promise.resolve();
                const fileSql = `
                    INSERT INTO files (filename, date, time, file_path, file_id)
                    VALUES (?, CURDATE(), CURTIME(), ?, ?)
                `;
                const fileValues = [filename, `/uploads/${filename}`, file_id];
                return new Promise((resolve, reject) => {
                    pool.query(fileSql, fileValues, (error, result) => {
                        if (error) {
                            console.error('Error in adding file:', error);
                            return reject({ message: 'Error in adding file', error });
                        }
                        resolve('Successfully added file.');
                    });
                });
            };

            const filePromises = [
                req.files['coe_file'] && insertFile(coe_file),
                req.files['brgy_indigency'] && insertFile(brgy_indigency),
                req.files['cog_file'] && insertFile(cog_file),
                req.files['parent_id'] && insertFile(parent_id),
                req.files['school_id'] && insertFile(school_id),
                req.files['certificate_of_registration_comelec'] && insertFile(certificate_of_registration_comelec),
            ].filter(Boolean);

            await Promise.all([updateProfile, ...filePromises]);

            console.log('Profile updated successfully!');
            res.status(200).json({ message: 'Profile updated successfully!' });
        } catch (err) {
            console.error('Transaction failed:', err);
            res.status(500).json({ message: 'Transaction failed', error: err });
        }
    }
);

router.post(
    '/addProfiles',
    upload.fields([
        { name: 'coe_file', maxCount: 1 },
        { name: 'brgy_indigency', maxCount: 1 },
        { name: 'cog_file', maxCount: 1 },
        { name: 'school_id', maxCount: 1 },
        { name: 'parent_id', maxCount: 1 },
        { name: 'certificate_of_registration_comelec', maxCount: 1 },
    ]),
    async (req, res) => {
        const {
            user_id,
            email,
            firstname,
            middlename,
            lastname,
            birthdate,
            gender,
            civil_status,
            current_address,
            permanent_address,
            contact,
            mother_firstname,
            mother_middlename,
            mother_lastname,
            mother_current_address,
            mother_permanent_address,
            mother_contact_number,
            mother_registered_voter,
            mother_voting_years,
            father_firstname,
            father_middlename,
            father_lastname,
            father_current_address,
            father_permanent_address,
            father_contact_number,
            father_registered_voter,
            father_voting_years,
            primary_school_name,
            primary_school_address,
            primary_school_year_attended,
            secondary_school_name,
            secondary_school_address,
            secondary_school_year_attended,
        } = req.body;

        console.log(req.body);

        const coe_file = req.files['coe_file'] ? req.files['coe_file'][0].filename : req.body.coe_file;
        const brgy_indigency = req.files['brgy_indigency'] ? req.files['brgy_indigency'][0].filename : req.body.brgy_indigency;
        const cog_file = req.files['cog_file'] ? req.files['cog_file'][0].filename : req.body.cog_file;
        const parent_id = req.files['parent_id'] ? req.files['parent_id'][0].filename : req.body.parent_id;
        const school_id = req.files['school_id'] ? req.files['school_id'][0].filename : req.body.school_id;
        const certificate_of_registration_comelec = req.files['certificate_of_registration_comelec']
            ? req.files['certificate_of_registration_comelec'][0].filename
            : req.body.certificate_of_registration_comelec;

        const file_id = generateUniqueId();

        try {
            // Profile update query
            const profileSql = `
                INSERT INTO profile (
                    profile_id,
                    user_id,
                    email,
                    firstname,
                    middlename,
                    lastname,
                    birthdate,
                    gender,
                    civil_status,
                    current_address,
                    permanent_address,
                    contact,
                    mother_firstname,
                    mother_middlename,
                    mother_lastname,
                    mother_current_address,
                    mother_permanent_address,
                    mother_contact_number,
                    mother_registered_voter,
                    mother_voting_years,
                    father_firstname,
                    father_middlename,
                    father_lastname,
                    father_current_address,
                    father_permanent_address,
                    father_contact_number,
                    father_registered_voter,
                    father_voting_years,
                    primary_school_name,
                    primary_school_address,
                    primary_school_year_attended,
                    secondary_school_name,
                    secondary_school_address,
                    secondary_school_year_attended,
                    coe_file,
                    brgy_indigency,
                    cog_file,
                    parent_id,
                    school_id,
                    certificate_of_registration_comelec
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const profileValues = [
                generateUniqueId(),
                user_id,
                email,
                firstname,
                middlename,
                lastname,
                birthdate,
                gender,
                civil_status,
                current_address,
                permanent_address,
                contact,
                mother_firstname,
                mother_middlename,
                mother_lastname,
                mother_current_address,
                mother_permanent_address,
                mother_contact_number,
                mother_registered_voter,
                mother_voting_years,
                father_firstname,
                father_middlename,
                father_lastname,
                father_current_address,
                father_permanent_address,
                father_contact_number,
                father_registered_voter,
                father_voting_years,
                primary_school_name,
                primary_school_address,
                primary_school_year_attended,
                secondary_school_name,
                secondary_school_address,
                secondary_school_year_attended,
                coe_file,
                brgy_indigency,
                cog_file,
                parent_id,
                school_id,
                certificate_of_registration_comelec,
            ];

            const addProfile = new Promise((resolve, reject) => {
                pool.query(profileSql, profileValues, (error, result) => {
                    if (error) {
                        console.error('Error in adding profile:', error);
                        return reject({ message: 'Error in adding profile', error });
                    }
                    console.log('Successfully added profile.');
                    resolve('Successfully added profile.');
                });
            });

            // File insertion query
            const insertFile = (filename) => {
                if (!filename) return Promise.resolve();
                const fileSql = `
                    INSERT INTO files (filename, date, time, file_path, file_id)
                    VALUES (?, CURDATE(), CURTIME(), ?, ?)
                `;
                const fileValues = [filename, `/uploads/${filename}`, file_id];
                return new Promise((resolve, reject) => {
                    pool.query(fileSql, fileValues, (error, result) => {
                        if (error) {
                            console.error('Error in adding file:', error);
                            return reject({ message: 'Error in adding file', error });
                        }
                        console.log('Successfully added file.');
                        resolve('Successfully added file.');
                    });
                });
            };

            const filePromises = [
                req.files['coe_file'] && insertFile(coe_file),
                req.files['brgy_indigency'] && insertFile(brgy_indigency),
                req.files['cog_file'] && insertFile(cog_file),
                req.files['parent_id'] && insertFile(parent_id),
                req.files['school_id'] && insertFile(school_id),
                req.files['certificate_of_registration_comelec'] && insertFile(certificate_of_registration_comelec),
            ].filter(Boolean);

            const mailOptions = {
                to: email,
                from: 'librarysmart69@gmail.com',
                subject: 'Scholarship Form Processed',
                text: `We are pleased to inform you that the form you submitted has been successfully processed. You are now ready to apply for any scholarship program. Best of luck with your applications!`
            };
          
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: 'Error sending email' });
                }
                res.status(200).json({ message: 'Reset email sent' });
            });

            await Promise.all([addProfile, ...filePromises]);
            console.log('Profile added successfully!');
            res.status(200).json({ message: 'Profile added successfully!' });
        } catch (err) {
            console.error('Transaction failed:', err);
            res.status(500).json({ message: 'Transaction failed', error: err });
        }
    }
);


module.exports = router