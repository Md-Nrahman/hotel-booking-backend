const User = require("../models/User");


const updateUser = async (req, res, next) => {
    const newUser=new User(req.body)
    try {
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(savedUser);
    } catch (error)  {
        next(error);
    }
        
  }

  const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
    } catch (error)  {
        next(error);
    }
  }

  const getUsers = async (req, res, next) => {
   try {
        const Users=await User.find();
        res.status(200).json(Users);
    } catch (error) {
      next(error);
    }
  }

  const getSpecificUser = async (req, res, next) => {
    try {
        const User= await User.findById(req.params.id);
        res.status(200).json(User);
    } catch (error)  {
        next(error);
    }
       
  }


module.exports = {updateUser, deleteUser, getUsers, getSpecificUser};