const express = require('express')
const router = express.Router()
const pool = require('../db').promise();
const path = require('path');
const multer = require('multer');
const passwordHash = require('password-hash')
const { v4: uuidv4 } = require('uuid');

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

router.post('/addProfiles', upload.fields([
    { name: 'coeFile', maxCount: 1 },
    { name: 'brgyIndigencyFile', maxCount: 1 },
    { name: 'cogFile', maxCount: 1 },
    { name: 'schoolIDFile', maxCount: 1 },
    { name: 'parentIDFile', maxCount: 1 }
  ]), async (req, res) => {

    console.log(req.body)

    const profile_id = generateUniqueId();
    const status = 'pending';

    const {
      user_id, program_id, email, firstname, middlename, lastname, birthdate, gender, civil_status,
      current_address, permanent_address, contact,
      mother_firstname, mother_middlename, mother_lastname,
      mother_current_address, mother_permanent_address, mother_contact_number, mother_registered_voter, mother_voting_years,
      father_firstname, father_middlename, father_lastname,
      father_current_address, father_permanent_address, father_contact_number, father_registered_voter, father_voting_years, profile_picture
    } = req.body;


    const coeFile = req.files['coeFile'] ? req.files['coeFile'][0].filename : null;
    const brgyIndigencyFile = req.files['brgyIndigencyFile'] ? req.files['brgyIndigencyFile'][0].filename : null;
    const cogFile = req.files['cogFile'] ? req.files['cogFile'][0].filename : null;
    const parentIDFile = req.files['parentIDFile'] ? req.files['parentIDFile'][0].filename : null;
    const schoolIDFile = req.files['schoolIDFile'] ? req.files['schoolIDFile'][0].filename : null;

    const file_id = generateUniqueId(); // Generate a unique fileID for all files
  
    // Use a connection from the pool
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction(); // Start a transaction
  
      // Insert form data into profile table
    const profileSql = `
       INSERT INTO profile (
        profile_id, user_id, program_id, email, firstname, middlename, lastname, birthdate, gender, civil_status,
        current_address, permanent_address, contact,
        mother_firstname, mother_middlename, mother_lastname,
        mother_current_address, mother_permanent_address, mother_contact_number, mother_registered_voter, mother_voting_years,
        father_firstname, father_middlename, father_lastname,
        father_current_address, father_permanent_address, father_contact_number, father_registered_voter, father_voting_years, profile_picture,
        parent_id, school_id, cog_file, brgy_indigency, coe_file, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Ensure that profileValues has the correct number of items
    const profileValues = [
        profile_id, user_id, program_id, email, firstname, middlename, lastname, birthdate, gender, civil_status,
        current_address, permanent_address, contact,
        mother_firstname, mother_middlename, mother_lastname,
        mother_current_address, mother_permanent_address, mother_contact_number, mother_registered_voter, mother_voting_years,
        father_firstname, father_middlename, father_lastname,
        father_current_address, father_permanent_address, father_contact_number, father_registered_voter, father_voting_years, profile_picture,
        parentIDFile ? parentIDFile : null, // Store fileID for parent ID file
        schoolIDFile ? schoolIDFile : null, // Store fileID for school ID file
        cogFile ? cogFile : null, // Store fileID for COG file
        brgyIndigencyFile ? brgyIndigencyFile : null, // Store fileID for Barangay Indigency file
        coeFile ? coeFile : null, // Store fileID for COE file
        status
    ];
  
      await connection.query(profileSql, profileValues); // Insert into profile
  
      // Function to insert files into the 'files' table
      const insertFile = async (filename) => {
        if (!filename) return; // Skip if no file uploaded
        const fileSql = `
          INSERT INTO files (filename, date, time, file_path, file_id)
          VALUES (?, CURDATE(), CURTIME(), ?, ?)
        `;
        
        const fileValues = [filename, `/uploads/${filename}`, file_id];
        await connection.query(fileSql, fileValues); // Insert file into files
      };
  
      // Insert all files into the 'files' table
      await insertFile(coeFile);
      await insertFile(brgyIndigencyFile);
      await insertFile(cogFile);
      await insertFile(parentIDFile);
      await insertFile(schoolIDFile);
  
      

      const mailOptions = {
        to: email,
        from: 'librarysmart69@gmail.com',
        subject: 'Application Received - Awaiting Further Review',
        text: `Hi ${firstname},

Thank you for submitting your application for our scholarship program. We’ve successfully received your application, and it is currently under review.

Please allow us some time to evaluate your qualifications. We will notify you via email if you meet the requirements and are selected to move forward in the process.

If you have any questions or need further information, feel free to contact us.

Thank you again for your interest, and we wish you the best of luck!

Best regards,
Admin`
      }; 
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ message: 'Error sending email' });
        }

        res.status(200).json({ message: 'Profile, account, and files created successfully' });

      });

      const programQuery = 'SELECT total_applicant FROM programs WHERE program_id=?'
      const updateProgramQuery = 'UPDATE programs SET total_applicant=? WHERE program_id=?'
      const currentTotalApplicant = await connection.query(programQuery, [program_id]);

      if (currentTotalApplicant) {
        const updatedNumber = currentTotalApplicant[0][0].total_applicant + 1
        await connection.query(updateProgramQuery, [updatedNumber, program_id])
      }

      // Commit the transaction
      await connection.commit();

    } catch (err) {
      await connection.rollback(); // Rollback in case of error
      console.error('Transaction failed:', err);
      res.status(500).json({ message: 'Transaction failed', error: err });
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  });

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



module.exports = router