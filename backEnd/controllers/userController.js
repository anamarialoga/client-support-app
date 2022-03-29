//Contains the functionality 
const asyncHandler=require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const dotenv= require('dotenv');

//asyncHandler - to avoid try catch

dotenv.config();

// @desc Register new user
// @route /api/users
// @access Public
// POST
const registerUser = asyncHandler(async (req, rsp)=>{
    //The POST request is made through the body
    const {name, email, password} = req.body;
    console.log(name, email, password); 

    //if credentials are not written correctly
    if(!name || !email || !password){
        console.log('Invalid Input')
        return rsp.status(400).send({message: 'Invalid Input'});
    }

    //if user already exists
    const userExists = await User.findOne({email});//search by email if exists
    if(userExists){
        console.log('User already exists');  
        return rsp.status(400).send({message: 'User already exists'});
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
            token: generateToken(user._id, user.name, user.email)
        })
    }else{ //failure
        console.log('Something went wrong');
        return rsp.status(400).send({message: 'Something went wrong'});
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
            return rsp.status(404).send({message: 'User not found'});
        }
        
        if(user && (await bcrypt.compare(password, user.password))){
           return rsp.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id, user.name, user.email)
            })
        }
        else{
            console.log('Invalid password');
            return rsp.status(404).send({message: 'Invalid Password'});
        }

    }catch(error){
       console.log('Something went wrong');
       return rsp.status(500).send({message: 'Something went wrong'});
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
const generateToken = (id, name, email) =>{
    return jwt.sign({id, name, email}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


module.exports={
    registerUser, 
    loginUser, 
    getMe
}