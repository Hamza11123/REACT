// import Notes from '../models/Notes'
// import { User } from "../models/User";
const router = require('express').Router();
const User = require('../models/User');
const Notes = require("../models/Notes");
const bcryptJS = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchuser');
const JWT_SECRET_KEY = "HamzaShaikh@gmail.com";

// importing 'express-validator' package, to validate mongodb-fields through mongoose
const { body, validationResult } = require('express-validator');




// Creating A User, Using POST "/api/auth/register" - No Login Required
router.post('/register', [
    // Defining [Validation-Rules]
    body('name', 'enter a valid user-name').isLength({ min: 4 }),
    body('email', 'enter a valid user-email').isEmail(),
    body('password', 'enter a valid user-password').isLength({ min: 8 }),

],  async (req,  res) => {
    let success = false;    // red-signal for given-creditials

    const errors = validationResult(req);
    // If any Fields Doesn't Obey The "Validation-Rule", Then Log The Validation-Error
    if (!errors.isEmpty()) {
      return res.status(400).send({success, error: errors.array()});
    }

    // const user = User(req.body);
    // user.save();

    
    try {
        const {name, email, password} = req.body;   // Getting Data From [Front-end] through POST-request
        

        // Checking if the account with same email Exists?
        if(await User.findOne({email: email})) 
            return res.status(400).send({success, error:"Account Already Exists"});

        const securePassword = await bcryptJS.hash(password, await bcryptJS.genSalt(10));   // Hashing The [Given-Password]

        // Storing Into Data-Base, But If Any-Error Occured It Jums To [Catch-Block]
        const registeredUser = await User.create({
            name:name,  
            email:email,    
            password:securePassword   
        });
        console.log(registeredUser)


        // Data To Create JWT-Token
        const data = {
            user: { id: registeredUser.id }
        }

        console.log("data", data);

        
        const authToken = jwt.sign(data, JWT_SECRET_KEY);   // Generating JWT-Token With "MongoDB-User-ID"
        success = true;
        return res.json({success, authToken});
        
        // Returning The JSON Of Entered-UserName, Email, Passwerd As A Response
        // return res.status(200).send({RegisteredDocument: registeredUser, message: "Good hogya jee :D"});

    } catch (_err) {

        // Error On Node-Console
        console.log(_err);

        // If Any Error Occured In Try Block.. Log That Error
        res.status(500).send("Internal Server Error");
    }
    
    
});


router.post('/login', [

    // Defining [Validation-Rules]
    body('email', 'enter a valid user-email').isEmail(),
    body('password', 'Enter Password').exists()

],  async (req,  res) =>{
    const errors = validationResult(req);
     
    let success = false;    
    
    // If any Fields Doesn't Obey The "Validation-Rule", Then Log The Validation-Error
    if (!errors.isEmpty()) {
      return res.status(400).send({success, error: errors.array()});
    }


    const {email, password} = req.body;
    try {
        const user = await User.findOne({email: email});
        if(!user) 
            return res.status(400).send({success, error: "Kindly, Enter Correct Credentials! :("});
        
        const passwordCompare = await bcryptJS.compare(password, user.password);
        if(!passwordCompare) {
            return res.status(400).send({success, error: "Kindly, Enter Correct Credentials! :("});
        }
        const data = {
            user: { id: user.id }
        }
        const authToken = jwt.sign(data, JWT_SECRET_KEY); 
        success = true;
        res.json({success, authToken});
        
    } catch (error) {
         // Error On Node-Console
         console.log(_err);

         // If Any Error Occured In Try Block.. Log That Error
         res.status(500).send({success, error});
    }
});



router.post('/getuser', fetchUser, async (req, res) => {

    try {
        // (req.user).id -> Containing the "MongoDB-document-unique-ID", That is fetched By the [Middle-Ware] "fetchUser()" 
        const userId = (req.user).id;   // containing unique-id of the mongodb-document 
        
        const user = await User.findById(userId);   // finding the document... through the unique-id
        
        return res.send("hey"+ user)

    } catch (_err) {
        return res.send("error")
    }
});

module.exports = router;
