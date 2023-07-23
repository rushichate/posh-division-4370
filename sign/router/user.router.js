const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const Redis = require("ioredis")
const { UserModel } = require("../model/user.model");
const redis = new Redis();
const userRouter = express.Router();



userRouter.post("/signup",async(req,res)=>{
    const {email,password} = req.body;
    try{
        const isEmailPresent = await UserModel.findOne({email});
        if(isEmailPresent){
            return  res.status(500).json({message:"Email already present"})
        }
        const hashPassword = bcrypt.hashSync(password,5);
        const newUser = new UserModel({...req.body,password:hashPassword})
        await newUser.save();
        res.status(200).json({message:"User created"})
        
    }catch(err){
      res.status(400).json(err.message);
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} =  req.body;
    try{
      const isUserValid = await UserModel.findOne({email})
      if(!isUserValid){
        return  res.status(500).json([{message:"Please Signup First"}])
      }

      const isPasswordCorrect = bcrypt.compareSync(password,isUserValid.password)
      if(!isPasswordCorrect){
        return  res.status(500).json([{message:"Wrong Credentials"}])
      }

      const accessToken = jwt.sign({name:isUserValid.name},"masai",{expiresIn:"60m"})
      const refreshToken = jwt.sign({name:isUserValid.name},"masaimasai",{expiresIn:"10m"})

      await redis.set(isUserValid._id + "_access_token",accessToken,"EX",60*5)
      await redis.set(isUserValid._id + "_refresh_token",refreshToken,"EX",60*10)
      
      res.status(200).json([{message:"Login Success"},{token:accessToken},{name:isUserValid.name}]);
    }catch(err){
       res.status(400).json(err.message)
    }
})


module.exports = {
    userRouter
}