const mongoose= require('mongoose');
const validator = require('validator');
const userSchema= mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter Name'],
    },
    email:{
        type:String,
        required:[true,'Please enter Email'],
        unique: true,
        validate: [validator.isEmail,'Please enter valid email address'],
    },
    password:{
        type:String,
        required: [true, 'Please enter password'],
        maxlength:[6,'Password cannot exist 6 characters'],

    },
    avatar:{
        type:String, //img file name
        required:true,

    },
    role:{
        type:String,
        defalut:'user',
    },
    resetPasswordToken:String,
    resetPasswordTokenExpire:Date,  
    
    createdAt :{
        type:Date,
        default:Date.now,
    }

})
const userModel = mongoose.model('User',userSchema)
module.exports=userModel;