const mongoose = require("mongoose")

 

 const serverConnect =mongoose.connect("mongodb+srv://rushichate8006:rushikesh@cluster0.zvech0i.mongodb.net/nxm201ChatApplication?retryWrites=true&w=majority")
  .then(()=>console.log('connected'))
  .catch(e=>console.log(e));
module.exports ={
    serverConnect
}