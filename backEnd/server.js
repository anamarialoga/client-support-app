const express = require ('express');
const dotenv= require('dotenv');
const PORT = process.env.PORT || 5000;

const app = express();

app.get('/', (req, rsp)=>{
    rsp.status(200).json({message: "Welcome to the Client Support API"});
})

//Routes
//connect with the route file, which contains the strings to be added to the route;
app.use('/api/users', require('./routes/userRoutes') )

app.listen(PORT, ()=>console.log('SERVER STARTED ON PORT ', PORT));
