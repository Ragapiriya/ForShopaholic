const mongoose= require('mongoose');

//productSchema
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
            image:{
                type:String,
                required:true
            }
          
        }
    ],
    category:{
        type:String,
        required:[true,"Please enter product category"],
        enum:{
            values:['Electronics', 'Mobile Phones', 'Laptops', 'Accessories', 'Headphones', 'Foods', 'Books', 'Cloths/Shoes', 'Beauty/Health', 'Sports', 'Outdoor','Home'],
            message:"Please set correct category",
        }

    },
    seller:{
        type:String,
        required:[true,"Please enter product seller"]
    },
    stock:{
        type:Number,
        required:[true,"Please enter available product stock"],
        maxlength:[50,"Product stock can not exceed 50"]
    },
    numOfReviews:{
        type:Number,
        default:0,
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:String,
                required:true,
            },
            comment:{
                type:String,
                required:true,
                maxlength:[500,"Comment don't exceed 500 characters"],
            }


        }
    ],
    createAt:{
        type:Date,
        default:Date.now()
    }

})

const productModel = mongoose.model('Product',productSchema)
module.exports=productModel;