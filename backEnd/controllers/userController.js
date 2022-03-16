//Contains the functionality 


const asyncHandler=require('express-async-handler');

// @desc Register new user
// @route /api/users
// @access Public
const registerUser = asyncHandler(async (req, rsp)=>{
    //The request is made through the body
    const {name, email, password} = req.body;
    console.log(name, email, password); 

    if(!name || !email || !password){
        rsp.status(400)
        throw new Error('Please complete all input fields!')
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