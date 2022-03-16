//Contains the functionality 

const registerUser = (req, rsp)=>{
    rsp.send('Register Route');
}

const loginUser = (req, rsp)=>{
    rsp.send('Login Route');
}

module.exports={
    registerUser, 
    loginUser
}