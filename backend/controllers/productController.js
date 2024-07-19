const productModel= require('../models/productModel')

//get products - {{base_url}}/api/v1/products/
//it is a handler function
exports.getProducts =async (req,res,next)=>{
    const products = await productModel.find();

    res.status(200).json({
        success: true,
        count:products.length,
        products:products,
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