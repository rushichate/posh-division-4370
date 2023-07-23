const mongoose=require("mongoose")

const schema=mongoose.Schema({
    groupname:{type:String},
    user:{type:String}
})


const groupmodel=mongoose.model("group",schema)

module.exports=groupmodel



