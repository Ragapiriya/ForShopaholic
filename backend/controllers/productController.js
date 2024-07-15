const productModel= require('../models/productModel')

//get products - {{base_url}}/api/v1/products/
//it is a handler function
exports.getProducts = (req,res,next)=>{
    res.status(200).json({
        success: true,
        message:"This route will show all the products in the database",
    })
}

//create product - {{base_url}}/api/v1/products/new/
//it is a handler function
exports.newProduct = async (req,res,next)=>{
    const product = await productModel.create(req.body);
    res.status(201).json({
        success:true,
        product: product
    })
}