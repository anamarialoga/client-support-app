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

    //if credentials are not correct
    if(!name || !email || !password){
        rsp.status(400)
        throw new Error('Please complete all input fields!')
    }

    //if user already exists
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
        rsp.status(201).json({ // STATUS 201 - created
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
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
// POST
const loginUser = async (req, rsp)=>{
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            rsp.status(404);
            throw new Error('User not found!');
        }
        
        if(user && (await bcrypt.compare(password, user.password))){
            rsp.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        }
        else{
            rsp.status(404);
            throw new Error('Invalid credentials!');
        }

    }catch(error){
        rsp.status(500);
        throw new Error('Something went wrong');
    }

    rsp.send('Login Route');
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