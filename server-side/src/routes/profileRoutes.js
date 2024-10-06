const express = require('express')
const router = express.Router()
const pool = require('../db').promise();
const path = require('path');
const multer = require('multer');
const passwordHash = require('password-hash')

const nodemailer = require('nodemailer');
const emailPassword = 'sokb hpyq oevl gmkl';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'librarysmart69@gmail.com',
      pass: emailPassword
    }
  });

// Function to generate unique imageID
const generateUniqueId = () => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = 8;
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        result += charset.charAt(randomIndex);
    }

    return result;
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
    { name: 'parentIDFile', maxCount: 1 },
    { name: 'schoolIDFile', maxCount: 1 },
    { name: 'profilePic', maxCount: 1 } // Profile picture upload
  ]), async (req, res) => {
    const {
      firstname, middlename, lastname, birthdate, gender, civilStatus,
      currentAddress, permanentAddress, contact,
      mother_firstname, mother_middlename, mother_lastname,
      mother_currentAddress, mother_permanentAddress, mother_contact, mother_voters,
      father_firstname, father_middlename, father_lastname,
      father_currentAddress, father_permanentAddress, father_contact, father_voters,
      email, password // Include email and password here
    } = req.body;
  
    const coeFile = req.files['coeFile'] ? req.files['coeFile'][0].filename : null;
    const brgyIndigencyFile = req.files['brgyIndigencyFile'] ? req.files['brgyIndigencyFile'][0].filename : null;
    const cogFile = req.files['cogFile'] ? req.files['cogFile'][0].filename : null;
    const parentIDFile = req.files['parentIDFile'] ? req.files['parentIDFile'][0].filename : null;
    const schoolIDFile = req.files['schoolIDFile'] ? req.files['schoolIDFile'][0].filename : null;
    const profilePic = req.files['profilePic'] ? req.files['profilePic'][0].filename : null;
  
    console.log(profilePic)

    const fileID = generateUniqueId(); // Generate a unique fileID for all files
    const hashedPassword = passwordHash.generate(password); // Hash the password before storing
  
    // Use a connection from the pool
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction(); // Start a transaction
  
      // Insert form data into profile table
    const profileSql = `
        INSERT INTO profile (
            firstname, middlename, lastname, birthdate, gender, civil_status,
            current_address, permanent_address, contact,
            mother_firstname, mother_middlename, mother_lastname,
            mother_current_address, mother_permanent_address, mother_contact_number, mother_registered_voter,
            father_firstname, father_middlename, father_lastname,
            father_current_address, father_permanent_address, father_contact_number, father_registered_voter,
            profilePic, parent_id, school_id, cog_file, brgy_indigency, coe_file
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Ensure that profileValues has the correct number of items
    const profileValues = [
        firstname, middlename, lastname, birthdate, gender, civilStatus,
        currentAddress, permanentAddress, contact,
        mother_firstname, mother_middlename, mother_lastname,
        mother_currentAddress, mother_permanentAddress, mother_contact, mother_voters,
        father_firstname, father_middlename, father_lastname,
        father_currentAddress, father_permanentAddress, father_contact, father_voters,
        profilePic ? profilePic : null, // Store fileID for profile picture
        parentIDFile ? parentIDFile : null, // Store fileID for parent ID file
        schoolIDFile ? schoolIDFile : null, // Store fileID for school ID file
        cogFile ? cogFile : null, // Store fileID for COG file
        brgyIndigencyFile ? brgyIndigencyFile : null, // Store fileID for Barangay Indigency file
        coeFile ? coeFile : null // Store fileID for COE file
    ];
  
        await connection.query(profileSql, profileValues); // Insert into profile
  
      // Insert into accounts table with email and hashed password
      const accountSql = `
        INSERT INTO accounts (firstname, middlename, lastname, email, password, type, filename)
        VALUES (?, ?, ?, ?, ?, 'user', ?)
      `;
      
      const accountValues = [firstname, middlename, lastname, email, hashedPassword, profilePic];
  
      await connection.query(accountSql, accountValues); // Insert into accounts
  
      // Function to insert files into the 'files' table
      const insertFile = async (filename) => {
        if (!filename) return; // Skip if no file uploaded
        const fileSql = `
          INSERT INTO files (filename, date, time, file_path, fileID)
          VALUES (?, CURDATE(), CURTIME(), ?, ?)
        `;
        
        const fileValues = [filename, `/uploads/${filename}`, fileID];
        await connection.query(fileSql, fileValues); // Insert file into files
      };
  
      // Insert all files into the 'files' table
      await insertFile(profilePic);
      await insertFile(coeFile);
      await insertFile(brgyIndigencyFile);
      await insertFile(cogFile);
      await insertFile(parentIDFile);
      await insertFile(schoolIDFile);
  
      // Commit the transaction
      await connection.commit();

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

      
    } catch (err) {
      await connection.rollback(); // Rollback in case of error
      console.error('Transaction failed:', err);
      res.status(500).json({ message: 'Transaction failed', error: err });
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  });


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


  router.post('/checkAccounts', (req, res) => {
      const { email } = req.body;

      const query = 'SELECT * FROM accounts WHERE email=?';

      pool.query(query, [email], (error, result) => {
        if (error) {
            console.log(error)
            res.status(400).send(error)
        }
        console.log(result)
        res.status(200).json(result)
    })

  })

module.exports = router