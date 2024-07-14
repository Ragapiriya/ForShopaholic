const mongoose= require('mongoose');

const productSchema= mongoose.Schema({
    name: {
        type: String,
        required:[true, "Please enter product name"],
        trim:true,
        maxlength:[100,"Product name cannot exceed 100 characters."]
    },
    price:{
        type:Number,
        default:0.0,
    },
    description:{
        type:String,
        required:[true,"Please enter Product description"],

    },
    ratings:{
        type:String,
        default:0
    },
    images:[
        {
            filename
        }
    ]
})