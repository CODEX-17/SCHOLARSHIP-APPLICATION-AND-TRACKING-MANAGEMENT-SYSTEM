const express = require('express')
const router = express.Router()
const pool = require('../db').promise();
const path = require('path');
const multer = require('multer');
const passwordHash = require('password-hash')
const { v4: uuidv4 } = require('uuid');

const nodemailer = require('nodemailer');
const e = require('express');
const { error } = require('console');
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

  // router.post('/addProfiles', upload.fields([
  //   { name: 'coe_file', maxCount: 1 },
  //   { name: 'brgy_indigency', maxCount: 1 },
  //   { name: 'cog_file', maxCount: 1 },
  //   { name: 'school_id', maxCount: 1 },
  //   { name: 'parent_id', maxCount: 1 },
  //   { name: 'certificate_of_registration_comelec', maxCount: 1 }
  // ]), async (req, res) => {

  //   console.log(req.body)

  //   const profile_id = generateUniqueId();
  //   const status = 'pending';

  //   const {
  //     user_id, program_id, email, firstname, middlename, lastname, birthdate, gender, civil_status,
  //     current_address, permanent_address, contact,
  //     mother_firstname, mother_middlename, mother_lastname,
  //     mother_current_address, mother_permanent_address, mother_contact_number, mother_registered_voter, mother_voting_years,
  //     father_firstname, father_middlename, father_lastname,
  //     father_current_address, father_permanent_address, father_contact_number, father_registered_voter, father_voting_years, profile_picture
  //   } = req.body;


  //   const coe_file = req.files['coe_file'] ? req.files['coe_file'][0].filename : null;
  //   const brgy_indigency = req.files['brgy_indigency'] ? req.files['brgy_indigency'][0].filename : null;
  //   const cog_file = req.files['cog_file'] ? req.files['cog_file'][0].filename : null;
  //   const parent_id = req.files['parent_id'] ? req.files['parent_id'][0].filename : null;
  //   const school_id = req.files['school_id'] ? req.files['school_id'][0].filename : null;
  //   const certificate_of_registration_comelec = req.files['certificate_of_registration_comelec'] ? req.files['certificate_of_registration_comelec'][0].filename : null;

  //   const file_id = generateUniqueId(); // Generate a unique fileID for all files
  
  //   // Use a connection from the pool
  //   const connection = await pool.getConnection();
  //   try {
  //     await connection.beginTransaction(); // Start a transaction
  
  //     // Insert form data into profile table
  //   const profileSql = `
  //      INSERT INTO profile (
  //       profile_id, user_id, program_id, email, firstname, middlename, lastname, birthdate, gender, civil_status,
  //       current_address, permanent_address, contact,
  //       mother_firstname, mother_middlename, mother_lastname,
  //       mother_current_address, mother_permanent_address, mother_contact_number, mother_registered_voter, mother_voting_years,
  //       father_firstname, father_middlename, father_lastname,
  //       father_current_address, father_permanent_address, father_contact_number, father_registered_voter, father_voting_years, profile_picture,
  //       parent_id, school_id, cog_file, brgy_indigency, coe_file, certificate_of_registration_comelec, status
  //   ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  //   `;

  //   // Ensure that profileValues has the correct number of items
  //   const profileValues = [
  //       profile_id, user_id, program_id, email, firstname, middlename, lastname, birthdate, gender, civil_status,
  //       current_address, permanent_address, contact,
  //       mother_firstname, mother_middlename, mother_lastname,
  //       mother_current_address, mother_permanent_address, mother_contact_number, mother_registered_voter, mother_voting_years,
  //       father_firstname, father_middlename, father_lastname,
  //       father_current_address, father_permanent_address, father_contact_number, father_registered_voter, father_voting_years, profile_picture,
  //       parent_id ? parent_id : null, // Store fileID for parent ID file
  //       school_id ? school_id : null, // Store fileID for school ID file
  //       cog_file ? cog_file : null, // Store fileID for COG file
  //       brgy_indigency ? brgy_indigency : null, // Store fileID for Barangay Indigency file
  //       coe_file ? coe_file : null, // Store fileID for COE file
  //       certificate_of_registration_comelec ? certificate_of_registration_comelec : null, // Store fileID for COE file
  //       status
  //   ];
  
  //     await connection.query(profileSql, profileValues); // Insert into profile
  
  //     // Function to insert files into the 'files' table
  //     const insertFile = async (filename) => {
  //       if (!filename) return; // Skip if no file uploaded
  //       const fileSql = `
  //         INSERT INTO files (filename, date, time, file_path, file_id)
  //         VALUES (?, CURDATE(), CURTIME(), ?, ?)
  //       `;
        
  //       const fileValues = [filename, `/uploads/${filename}`, file_id];
  //       await connection.query(fileSql, fileValues); // Insert file into files
  //     };
  
  //     // Insert all files into the 'files' table
  //     await insertFile(coe_file);
  //     await insertFile(brgy_indigency);
  //     await insertFile(cog_file);
  //     await insertFile(parent_id);
  //     await insertFile(school_id);
  //     await insertFile(certificate_of_registration_comelec);
  
  //     // const mailOptions = {
  //     //   to: email,
  //     //   from: 'librarysmart69@gmail.com',
  //     //   subject: 'Application Received - Awaiting Further Review',
  //     //   text: `Hi ${firstname},

  //     //     Thank you for submitting your application for our scholarship program. We’ve successfully received your application, and it is currently under review.

  //     //     Please allow us some time to evaluate your qualifications. We will notify you via email if you meet the requirements and are selected to move forward in the process.

  //     //     If you have any questions or need further information, feel free to contact us.

  //     //     Thank you again for your interest, and we wish you the best of luck!

  //     //     Best regards,
  //     //     Admin`
  //     // }; 
  
  //     // transporter.sendMail(mailOptions, (error, info) => {
  //     //   if (error) {
  //     //     console.log(error);
  //     //     return res.status(500).json({ message: 'Error sending email' });
  //     //   }

  //     //   res.status(200).json({ message: 'Profile, account, and files created successfully' });

  //     // });

  //     // Commit the transaction
  //     await connection.commit();

  //   } catch (err) {
  //     await connection.rollback(); // Rollback in case of error
  //     console.error('Transaction failed:', err);
  //     res.status(500).json({ message: 'Transaction failed', error: err });
  //   } finally {
  //     connection.release(); // Release the connection back to the pool
  //   }
  // })

  // router.post('/updateProfiles', upload.fields([
  //   { name: 'coe_file', maxCount: 1 },
  //   { name: 'brgy_indigency', maxCount: 1 },
  //   { name: 'cog_file', maxCount: 1 },
  //   { name: 'school_id', maxCount: 1 },
  //   { name: 'parent_id', maxCount: 1 },
  //   { name: 'certificate_of_registration_comelec', maxCount: 1 }
  // ]), async (req, res) => {

  //   const {
  //     user_id, firstname, middlename, lastname, birthdate, gender, civil_status,
  //     current_address, permanent_address, contact,
  //     mother_firstname, mother_middlename, mother_lastname,
  //     mother_current_address, mother_permanent_address, mother_contact_number, mother_registered_voter, mother_voting_years,
  //     father_firstname, father_middlename, father_lastname,
  //     father_current_address, father_permanent_address, father_contact_number, father_registered_voter, father_voting_years
  //   } = req.body;


  //   const coe_file = req.files['coe_file'] ? req.files['coe_file'][0].filename : req.body.coe_file
  //   const brgy_indigency = req.files['brgy_indigency'] ? req.files['brgy_indigency'][0].filename : req.bodybrgy_indigency;
  //   const cog_file = req.files['cog_file'] ? req.files['cog_file'][0].filename : req.body.cog_file;
  //   const parent_id = req.files['parent_id'] ? req.files['parent_id'][0].filename : req.body.parent_id;
  //   const school_id = req.files['school_id'] ? req.files['school_id'][0].filename : req.body.school_id;
  //   const certificate_of_registration_comelec = req.files['certificate_of_registration_comelec'] ? req.files['certificate_of_registration_comelec'][0].filename : req.body.certificate_of_registration_comelec;

  //   const file_id = generateUniqueId(); // Generate a unique fileID for all files
  
  //   // Use a connection from the pool
  //   const connection = await pool.getConnection();

  //   try {
  //     await connection.beginTransaction(); // Start a transaction
  
  //     // Insert form data into profile table
  //   const profileSql = `
  //      UPDATE profile SET
  //       firstname = ?, middlename = ?, lastname = ?, birthdate = ?, gender = ?, civil_status = ?,
  //       current_address = ?, permanent_address = ?, contact = ?,
  //       mother_firstname = ?, mother_middlename = ?, mother_lastname = ?,
  //       mother_current_address = ?, mother_permanent_address = ?, mother_contact_number = ?, mother_registered_voter = ?, mother_voting_years = ?,
  //       father_firstname = ?, father_middlename = ?, father_lastname = ?,
  //       father_current_address = ?, father_permanent_address = ?, father_contact_number = ?, father_registered_voter = ?, father_voting_years = ?,
  //       parent_id = ?, school_id = ?, cog_file = ?, brgy_indigency = ?, coe_file = ?, certificate_of_registration_comelec = ?
  //       WHERE user_id = ?
  // `

  //   // Ensure that profileValues has the correct number of items
  //   const profileValues = [
  //     firstname, middlename, lastname, birthdate, gender, civil_status,
  //     current_address, permanent_address, contact,
  //     mother_firstname, mother_middlename, mother_lastname,
  //     mother_current_address, mother_permanent_address, mother_contact_number, mother_registered_voter, mother_voting_years,
  //     father_firstname, father_middlename, father_lastname,
  //     father_current_address, father_permanent_address, father_contact_number, father_registered_voter, father_voting_years,
  //     parent_id, school_id, cog_file, brgy_indigency, coe_file, certificate_of_registration_comelec, user_id
  //   ]
  
  //     await connection.query(profileSql, profileValues); // Insert into profile
  
  //     // Function to insert files into the 'files' table
  //     const insertFile = async (filename) => {
  //       if (!filename) return; // Skip if no file uploaded
  //       const fileSql = `
  //         INSERT INTO files (filename, date, time, file_path, file_id)
  //         VALUES (?, CURDATE(), CURTIME(), ?, ?)
  //       `;
        
  //       const fileValues = [filename, `/uploads/${filename}`, file_id];
  //       await connection.query(fileSql, fileValues); // Insert file into files
  //     };
  
  //     // Insert all files into the 'files' table
      
  //     if (req.files['coe_file']) await insertFile(coe_file);
  //     if (req.files['brgy_indigency']) await insertFile(brgy_indigency);
  //     if (req.files['cog_file']) await insertFile(cog_file);
  //     if (req.files['parent_id']) await insertFile(parent_id);
  //     if (req.files['school_id']) await insertFile(school_id);
  //     if (req.files['certificate_of_registration_comelec']) await insertFile(certificate_of_registration_comelec);

  //     // Commit the transaction
  //     await connection.commit();
  //     res.status(200).json({ message: 'Profile updated successfully!' });
  //   } catch (err) {
  //     await connection.rollback(); // Rollback in case of error
  //     console.error('Transaction failed:', err);
  //     res.status(500).json({ message: 'Transaction failed', error: err });
  //   } finally {
  //     connection.release(); // Release the connection back to the pool
  //   }
  // })

  //GET ALL PROFILES
  

  
  router.get('/getProfiles', async (req, res)  => {
    const sql = 'SELECT * FROM profile'

    try {
        // Use async/await to handle the query
        const [rows] = await pool.query(sql); // No callbacks, we get the result using promise API
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No profiles found' });
        }
        res.status(200).json(rows); // Send the result back as JSON
    } catch (error) {
        console.error('Error fetching profiles:', error);
        res.status(500).json({ error: 'An error occurred while fetching profiles' });
    }
  })


  //GET PROFILES BY ID
  router.get('/getProfilesByID', async (req, res)  => {
    const { profile_id } = req.params
    const sql = 'SELECT * FROM profile'

    try {
        // Use async/await to handle the query
        const [rows] = await pool.query(sql); // No callbacks, we get the result using promise API
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No profiles found' });
        }
        res.status(200).json(rows); // Send the result back as JSON
    } catch (error) {
        console.error('Error fetching profiles:', error);
        res.status(500).json({ error: 'An error occurred while fetching profiles' });
    }
  })

  //GET PROFILE BY USER_ID
  router.get('/getProfileByUserID/:user_id', async (req, res)  => {
    const { user_id } = req.params

    console.log(user_id)

    const query = 'SELECT * FROM profile WHERE user_id=?'

    try {
        
      const [rows] = await pool.query(query, [user_id])
        
      if (rows.length === 0) {
        console.log('No profiles found.')
        return res.status(404).json({ message: 'No profiles found' });
      }
        res.status(200).json(rows)

    } catch (error) {
        console.log('Error in server:', error)
        res.status(400).send(error)
    }
  })



  router.post('/checkAccounts', (req, res) => {
      const { email } = req.body;

      const query = 'SELECT * FROM accounts WHERE email=?';

      pool.query(query, [email], (error, result) => {
        if (error) {
            console.log(error)
            res.status(400).send(error)
        }

        res.status(200).json(result)
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
          resolve('Successfull updating account.')
        }
      })
    })

    await Promise.all([deletingProfile, updatingAccount])
    console.log('Successfully deleted applications.')
    res.status(200).json({ message: 'Successfully deleted applications.' })

  } catch (error) {
    res.status(400).send(error)
  }
  
})



module.exports = router