const express = require("express")
const {Server} = require("socket.io")
const http = require("http")
const cors = require("cors");
const { serverConnect } = require("./db");
const { userRouter } = require("./sign/router/user.router");
const { messageRouter, groupRouter } = require("./sign/router/chat");
const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer);
const varify=require("./sign/middleware/auth");



app.use(express.json())
app.use(cors());

app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/frontend/index.html")
})
app.use("/users",userRouter)
 app.use(varify)
app.use("/message",messageRouter)
app.use("/group",groupRouter)








let groupjoiners=[]



io.on("connection",(Socket)=>{
    console.log("connestion established")

    Socket.on("join",(msg)=>{

       Socket.join(msg[0])
       let obj={socketid:Socket.id,group:msg[0],name:msg[1]}
       
       let data=isObjectExistInArray(groupjoiners, Socket.id, msg[0])
       groupjoiners=data
       groupjoiners.push(obj)
       const filteredData = data.filter((item) => item.group === msg[0]);
       io.to(msg).emit('default', msg[0]);
       io.to(msg).emit("group",filteredData)
     


    })

    Socket.on("newmessage",(msg)=>{

        
        io.to(msg[0]).emit('response', msg);
       
    })
  
    Socket.on("disconnect",(msg)=>{
        for(let i=0;i<groupjoiners.length;i++)
        {
            if(groupjoiners[i].Socketid=Socket.id)
            {
                groupjoiners.splice(i,1)
                break;
            }
        }
    })


})




  function isObjectExistInArray(arr, socketidToFind, groupToFind) {
    for (let i = arr.length - 1; i >= 0; i--) {
      const obj = arr[i];
      if (obj.socketid === socketidToFind) {
        arr.splice(i, 1);
        return arr;
      }
    }
    return arr;
  }






httpServer.listen(8000,async()=>{
    try{
    await serverConnect
    console.log("connected to DB")
    console.log("running on 8000")
    }catch(err){
        console.log(err)
    }
    
})