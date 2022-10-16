const express=require('express');
const { getRooms, updateRoom, deleteRoom, getSpecificRoom, createRoom } = require('../controllers/roomController');
const { verifyUser, verifyAdmin } = require('../utils/verifyToken');

const router=express.Router();

router.get('/',verifyAdmin, getRooms).post('/:hotelId', verifyAdmin, createRoom).put('/:id',verifyAdmin,updateRoom).delete('/:id/:hotelId',verifyAdmin,deleteRoom).get('/:id',verifyUser,getSpecificRoom);



module.exports=router;