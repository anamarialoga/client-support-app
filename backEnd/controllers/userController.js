//Contains the functionality 

const asyncHandler=require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const dotenv= require('dotenv');

dotenv.config();

// @desc Register new user
// @route /api/users
// @access Public
// POST
const registerUser = asyncHandler(async (req, rsp)=>{
    //The POST request is made through the body
    const {name, email, password} = req.body;
    console.log(name, email, password); 

    //if credentials are not correct (are not found in db)
    if(!name || !email || !password){
        console.log('Invalid Credentials')
        return rsp.status(400)
    }

    //if user already exists
    const userExists = await User.findOne({email});//search by email if exists
    if(userExists){
        console.log('User already exists')
        return rsp.status(400);
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
       return rsp.status(201).json({ // STATUS 201 - created
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{ //failure
        console.log('Something went wrong');
        return rsp.status(400);
    }
})

// @desc Login user
// @route /api/users/login
// @access Public
// POST
const loginUser = async (req, rsp)=>{
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            console.log('User not found');
            return rsp.status(404);
        }
        
        if(user && (await bcrypt.compare(password, user.password))){
           return rsp.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        }
        else{
            console.log('Invalid password');
            return rsp.status(404);
        }

    }catch(error){
       console.log('Something went wrong');
       return rsp.status(500);
    }
}

// @desc Retrieve data about the current connected user
// @route /api/users/me
// @access Protected
// GET
const getMe = asyncHandler(async (req, rsp) => {
    //destructuring user
    const user = { 
        id: req.user._id,
        email: req.user.email,
        name: req.user.name
    }
    rsp.status(200).json(user);   
})

//Tokens are needed for routes with @access Protected
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


module.exports={
    registerUser, 
    loginUser, 
    getMe
}