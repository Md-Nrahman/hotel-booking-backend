const Hotel = require("../models/Hotel");
const Room = require("../models/Room");

const createRoom = async (req, res) => {
    const hotelId= req.params.hotelId;
    const newRoom = new Room(req.body);
    try {
        const savedRoom = await newRoom.save();
        await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms:savedRoom._id}});
        res.status(200).json(savedRoom);
    } catch (error) {
        res.status(500).json(error);
    }
    }


    const updateRoom = async (req, res, next) => {
        try {
            const updatedRoom=await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
            res.status(200).json(savedRoom);
        } catch (error)  {
            next(error);
        }
            
      }
    
      const deleteRoom = async (req, res, next) => {
    const hotelId= req.params.hotelId;

        try {
            await Room.findByIdAndDelete(req.params.id);
            try {
                await Hotel.findByIdAndUpdate(hotelId,{$pull:{rooms:req.params.id}});
            } catch (error) {
                next(error)
            }
            res.status(200).json("Room has been deleted");
        } catch (error)  {
            next(error);
        }
      }
    
      const getRooms = async (req, res, next) => {
       try {
            const rooms=await Room.find();
            res.status(200).json(rooms);
        } catch (error) {
          next(error);
        }
      }
    
      const getSpecificRoom = async (req, res, next) => {
        try {
            const room= await Room.findById(req.params.id);
            res.status(200).json(room);
        } catch (error)  {
            next(error);
        }
           
      }

      module.exports={createRoom, updateRoom, deleteRoom, getRooms, getSpecificRoom}
    
    