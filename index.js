const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute=require('./api/routes/auth');
const usersRoute=require('./api/routes/users');
const hotelsRoute=require('./api/routes/hotels');
const roomsRoute=require('./api/routes/rooms');
const app = express();
dotenv.config();


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

app.use(express.json());

app.use('/api/auth',authRoute);
app.use('/api/users',usersRoute);
app.use('/api/hotels',hotelsRoute);
app.use('/api/rooms',roomsRoute);

app.listen(5000,()=>{
    connect()
    console.log('Server is running on port 5000');
});
