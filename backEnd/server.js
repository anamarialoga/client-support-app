const express = require ('express');
const colors = require ('colors');
const dotenv= require('dotenv');
dotenv.config();
const { errorHandler } = require('./middleware/errorMiddleware');
const { connectDB } = require('./config/db');


const PORT = process.env.PORT || 5000;
connectDB(); //connect to database
const app = express();

app.use(express.json());//send raw json
app.use(express.urlencoded({extended: false}));//send urlencoded
app.use(errorHandler);//use this Error format

app.get('/', (req, rsp)=>{
    rsp.status(200).json({message: "Welcome to the Client Support API"});
})

//Routes
//connect with the route file, which contains the strings to be added to the route;
app.use('/api/users', require('./routes/userRoutes') )

app.listen(PORT, ()=>console.log('SERVER STARTED ON PORT ', PORT));
