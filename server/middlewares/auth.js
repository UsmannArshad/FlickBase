const {User}=require('../models/user_model')
const jwt=require('jsonwebtoken')
require('dotenv').config()
exports.checkToken=async(req,res,next)=>{
    try{
    if(req.headers["auth"])
    {
        const accessToken=req.headers["auth"]
        const email=jwt.verify(accessToken,process.env.SUPERSECRET)
        res.locals.userData=await User.findOne({email:email})
        next()
    }
    else
    {
        next()
    }
    }
    catch(error)
    {
        return res.status(401).json({message:"Bad Token",err:error})
    }
    
}
exports.checkLoggedIn=async(req,res,next)=>
{
    const user=res.locals.userData
    if(!user)return res.status(401).json({error:"No!User Please Login"})
    req.user=user
    next()
}