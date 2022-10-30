const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute=require('./api/routes/auth');
const usersRoute=require('./api/routes/users');
const hotelsRoute=require('./api/routes/hotels');
const roomsRoute=require('./api/routes/rooms');
const cookieParser = require('cookie-parser');
const { verifyToken } = require('./api/utils/verifyToken');
var cors = require('cors')
const app = express();
dotenv.config();

var corsOptions = {
    origin: 'https://hotel-booking-app-frontend.herokuapp.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

  app.use(cors())


const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true, 
        });
        console.log('MongoDB connected');
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on('error', (err)=>{
    console.log(`MongoDB connection error: ${err.message}`);
});

mongoose.connection.on('disconnected', ()=>{
    console.log('MongoDB disconnected');
});

mongoose.connection.on('connected', ()=>{
    console.log('MongoDB connected');
});

app.use(cookieParser())
app.use(express.json());


app.use('/api/auth',authRoute);
// app.use(verifyToken)
app.use('/api/users',usersRoute);
app.use('/api/hotels',hotelsRoute);
app.use('/api/rooms',roomsRoute);

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Something went wrong';
    res.status(errorStatus).json({error:errorMessage});
})

var port_number = process.env.PORT || 3000;
app.listen(port_number,()=>{
    connect()
    console.log('Server is running on port 5000');
});
