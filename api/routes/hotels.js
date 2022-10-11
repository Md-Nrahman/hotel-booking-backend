const express=require('express');
const { createHotel, updateHotel, deleteHotel, getSpecificHotel, getHotels } = require('../controllers/hotelController');

const router=express.Router();

router.get('/', getHotels).post('/', createHotel).put('/:id',updateHotel).delete('/:id',deleteHotel).get('/:id',getSpecificHotel);



module.exports=router;