const productModel= require('../models/productModel')

//get products
exports.getProducts = (req,res,next)=>{
    res.status(200).json({
        success: true,
        message:"This route will show all the products in the database",
    })
}

//create a new product
//it is a handler function
exports.newProduct = ()=>{

}