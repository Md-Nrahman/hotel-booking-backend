const jwt=require('jsonwebtoken');
const {createError}=require('../utils/error.js');

const verifyToken = (req, res, next) => {
    const token=req.cookies.access_token;
    if(!token){
        return next(createError(401,"Unauthorized"));
    }
    
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            return next(createError(403,"Token is Inavlid!!"));
        }
        req.user=user;
        next();
    })
}

const verifyUser = (req, res, next) => {
    if(req.user.id===req.params.id || req.user.isAdmin){
        next();
    }else{
return next(createError(403,"You are not allowed to perform this action"));
    }
}

const verifyAdmin = (req, res, next) => {
    if(req.user.id===req.user.isAdmin){
        next();
    }else{
return next(createError(403,"You are not allowed to perform this action"));
    }
}

module.exports={verifyToken,verifyUser,verifyAdmin};

