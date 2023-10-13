const mongoose = require("mongoose")
require("dotenv").config()

 

 const serverConnect =  mongoose.connect(process.env.mongo)
  .then(()=>console.log('connected'))
  .catch(e=>console.log(e));
module.exports ={
    serverConnect
}