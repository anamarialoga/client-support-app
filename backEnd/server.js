const express = require ('express');
const dotenv= require('dotenv');
dotenv.config();
const { connectDB } = require('./config/db');
const cors = require('cors');
const path = require('path');


const PORT = process.env.PORT || 80;
connectDB(); //connect to database
const app = express();

app.use(cors());
app.use(express.json());//send raw json
app.use(express.urlencoded({extended: false}));//send urlencoded

//connect with the route file, which contains the strings to be added to the route;
app.use('/api/users', require('./routes/userRoutes') );
app.use('/api/tickets', require('./routes/ticketRoutes'));


//serve front-end
if (process.env.NODE_ENV === 'production') {
    // Set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))
  
    // FIX: below code fixes app crashing on refresh in deployment
    app.get('*', (_, res) => {
      res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
    })
  } else {
    app.get('/', (req, res) => {
      res.status(200).json({ message: 'Welcome to the Support Desk API' })
    })
}


app.listen(PORT, ()=>console.log('SERVER STARTED ON PORT ', PORT));
