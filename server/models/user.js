
const mongoose = require('mongoose')

// name , email , password , otp , otp expExpires , isVerified , balance , transactionPin, notificationsEnabled


const userSchema = new mongoose.Schema({

name:{
    type: String,
    required:true,
},
email:{
type:String,
required: true,
unique:true,
},
password:{
type:String,
required:true,
},
otp:{
     type: String,
},
otpExpires:{
type: Date,
},
isVerified:{
    type:Boolean,
    default : true,
},

balance:{
 type:Number,
 default:0,
},
transactionPin:{
    type:String,
    required:true
},
// NotificationEnabled:{
//     type:Boolean,
//     default:true //notification enabled by default
// },
resetPasswordToken :String,

});

module.exports = mongoose.model("User",userSchema)

//module.exports = mongoose.models.User || mongoose.model('User', userSchema)

