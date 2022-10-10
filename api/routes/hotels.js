const express=require('express');
const Hotel = require('../models/Hotel');

const router=express.Router();

router.get('/',async(req,res)=>{
    const hotels=await Hotel.find();
    res.status(200).json(hotels);
});

//Create
router.post('/',async(req,res)=>{

    const newHotel=new Hotel(req.body)
    try {
        const savedHotel=await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
        
    
});

//Update
router.put('/:id',async(req,res)=>{

    const newHotel=new Hotel(req.body)
    try {
        const updatedHotel=await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(savedHotel);
    } catch (error)  {
        res.status(500).json({error:error.message});
    }
        
    
});

//Delete
router.delete('/:id',async(req,res)=>{

    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted");
    } catch (error)  {
        res.status(500).json({error:error.message});
    }
        
    
});

//Get a hotel
router.get('/:id',async(req,res)=>{

    try {
        const hotel= await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (error)  {
        res.status(500).json({error:error.message});
    }
        
    
});



module.exports=router;