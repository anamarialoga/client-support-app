//Contains the functionality 

const asyncHandler=require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// @desc Register new user
// @route /api/users
// @access Public
const registerUser = asyncHandler(async (req, rsp)=>{
    //The request is made through the body
    const {name, email, password} = req.body;
    console.log(name, email, password); 

    //if credentials are not correct
    if(!name || !email || !password){
        rsp.status(400)
        throw new Error('Please complete all input fields!')
    }

    //is user already exists
    const userExists = await User.findOne({email});//search by email if exists
    if(userExists){
        rsp.status(400);
        throw new Error('User already exists');
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
        name,
        email,
        password: hashedPass,
    })

    if(user){ //success
        rsp.status(201).json({
            _id: user._id,
            _name: user.name,
            _email: user.email,
        })
    }else{ //failure
        rsp.status(400);
        throw new Error(`Could not registrate user`);
    }

    rsp.send('Register Route');
})

// @desc Login user
// @route /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, rsp)=>{
    rsp.send('Login Route');
})

module.exports={
    registerUser, 
    loginUser
}