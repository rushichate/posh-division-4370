const mongoose=require("mongoose")

let schema=mongoose.Schema({
    group:{type:String},
    user:{type:String},
    message:{type:String},
    time:{type:Date,default:Date.now}

})


schema.pre('save', function (next) {
    this.schema = new Date(); // Set 'createdAt' to the current date and time
    next();
  })


  let messagemodule=mongoose.model("message",schema)

  module.exports=messagemodule