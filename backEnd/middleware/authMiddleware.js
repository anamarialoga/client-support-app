//middleware to protect different routes

const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, rsp, next) =>{
    let token 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //get Token from Header
            //Split the sintagm 'Bearer Token' by space;
            token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            //get user from token
            //exclude password
            req.user = await User.findById(decode.id).select('-password');

            next();
        }catch(error){
            console.log(error);
            rsp.status(401);
            throw new Error('Not authorized');
        }
    }

    if(!token){
        rsp.status(401);
        throw new Error('Not authorized');
    }
})

module.exports = {protect}