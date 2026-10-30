const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({

user:{
 type:mongoose.Schema.Types.ObjectId,
 ref:"User",
 required:true
},

sender:{
 type:mongoose.Schema.Types.ObjectId,
 ref:"User"
},

receiver:{
 type:mongoose.Schema.Types.ObjectId,
 ref:"User"
},

amount:{
 type:Number,
 required:true
},

type:{
 type:String,
 enum:["deposit","send"],
 required:true
},

status:{
 type:String,
 enum:["pending","success","failed"],
 default:"success"
}

},{timestamps:true})

module.exports = mongoose.model("Transaction",transactionSchema)