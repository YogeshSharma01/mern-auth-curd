const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var fetchuser = require('../middleware/fetchuser');


const JWT_SECRETE = 'yogeshbro$001';


// creating a user by using : POST "/api/auth". No login required
router.post('/createuser', [
    body('name', 'Enter a Valid Name').isLength({ min: 3 }),
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async(req, res)=>{
  let success = false;
    // if there are errrors send the bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
    // Route-1 check wheather the user is already exits with this email
    let user = await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({success, error: "Sorry with this email a user is already exits, So please kindly change your email"});
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);

    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
      
      const Data = {
        user:{
         id: user.id
        } 
      }
      const authToken = jwt.sign(Data, JWT_SECRETE);
      success = true;
      res.json({success, authToken});
      



    } catch (error) {
      console.error(error.message);
      res.status(500).send('some error occured')
    }
    
    })


    // Route-2 Authentication using :POST "/api/auth/login" No login required

    router.post('/login', [
      body('email', 'Enter a Valid Email').isEmail(),
      body('password', 'Password must be atleast 5 characters').exists()
  ], async(req, res)=>{
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    try {
      let user = await User.findOne({email});
      if(!user){
        success = false;
        res.status(400).json({success, error: "Please try to login with correct Credentials"});
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare){
        success = false;
        res.status(400).json({success, error: "Please try to login with correct Credentials"});
      }
      const Data = {
        user:{
         id: user.id
        } 
      }
      const authToken = jwt.sign(Data, JWT_SECRETE);
      success = true;
      res.json({success, authToken});


    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error')
    }
  })


  // Route-3 GetLoged In User details using :POST "/api/auth/getuser" : login required
  router.post('/getuser', fetchuser,async(req, res)=>{
  try {
    userId = req.user.id; 
    const user = await User.findById(userId).select("-password");
    // res.json(user);
    res.send(user);

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error')
  }
});
module.exports= router;