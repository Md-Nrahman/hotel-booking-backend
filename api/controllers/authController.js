const User = require("../models/User");
const bcrypt=require('bcrypt');
const jwt = require("jsonwebtoken");

const register = async (req, res,next) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
        return res.status(400).json({ error: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
        username,
        email,
        password: hashedPassword,
        });
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        next(error);
    }
    };

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
        return res.status(400).json({ error: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        const {password, isAdmin,...otherDetails}=user._doc;
        res.cookie("access_token", token,{
            httpOnly:true,
        }).status(200).json({...otherDetails});
    } catch (error) {
        next(error);
    }
    };

module.exports = { register , login};