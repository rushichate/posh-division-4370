
const express=require("express")
const app=express()
const http=require("http")
const {Server}=require("socket.io")
let httpserver=http.createServer(app)
const groupmodel=require("../model/module.group")
const mongoose=require("mongoose")
var cors = require('cors')
const messagemodule=require("../model/module.message")
app.use(cors())
app.use(express.json())

const io=new Server(httpserver)

const messageRouter=express.Router()
const groupRouter=express.Router()



groupRouter.post("/addgroup",async(req,res)=>{

 

      let data= new groupmodel(req.body)
      await data.save()
      console.log(data,req.body)
      res.send(data)

    
    
   
})

groupRouter.get("/groupget",async(req,res)=>{

   try{
    let data=await groupmodel.find()
    res.send(data)

   }
   catch(err)
   {
    res.send(err)
   }
  

})

messageRouter.post("/addmessage",async(req,res)=>{

  try{
    let data= new messagemodule(req.body)
   await data.save()
    let group = data.group
    let data1=await messagemodule.find({group})
   res.send(data1)

  }
  catch(err)
  {
    res.send(err)
  }
 
  
})

messageRouter.get("/messageget/:msg",async(req,res)=>{

  try{
    let {msg}=req.params
    let data=await messagemodule.find({group:msg})
    res.send(data)

  }
  catch(err)
  {
    res.send(err)
  }
  
  

})

messageRouter.delete("/delete/:date/:message",async(req,res)=>{
    let {date,message}=req.params
    let data=await messagemodule.findOneAndDelete({message:date,time:date})
    res.send(data)

})




module.exports={groupRouter,messageRouter}













