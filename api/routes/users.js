const express=require('express');
const { getUsers, updateUser, deleteUser, getSpecificUser } = require('../controllers/userController');
const { verifyUser, verifyAdmin } = require('../utils/verifyToken');

const router=express.Router();

router.get('/',verifyAdmin, getUsers).put('/:id',verifyUser,updateUser).delete('/:id',verifyUser,deleteUser).get('/:id',verifyUser,getSpecificUser);



module.exports=router;