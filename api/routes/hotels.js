const express=require('express');
const { createHotel, updateHotel, deleteHotel, getSpecificHotel, getHotels, countByCity, countByType, getHotelRooms } = require('../controllers/hotelController');

const router=express.Router();

router.get('/', getHotels).post('/', createHotel).put('/find/:id',updateHotel).delete('/find/:id',deleteHotel).get('/find/:id',getSpecificHotel);
router.get('/countByCity',countByCity);
router.get('/countByType',countByType);
router.get('/hotelRooms/:id',getHotelRooms);


module.exports=router;