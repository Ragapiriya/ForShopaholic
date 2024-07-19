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



//get single product - {{base_url}}/api/v1/product/:id
//it is a handler function 

exports.getSingleProduct = async (req,res,next)=>{ 
    const product= await productModel.findById(req.params.id);
    if (!product)
    {
        return res.status(404).json({
            success:false,
            message:"Product not found",
        })
    }

    res.status(201).json({
        sucess:true,
        product:product,
    })
}


 
//update product -- {{base_url}}/api/v1/products/:id
//it is a handler function
exports.updateProduct = async (req,res,next)=>{
    let product = await productModel.findById(req.params.id);
    if (!product)
    {
        return res.status(404).json({
            success:false,
            message:"Product not found" 
        })
    }
    product = productModel.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,

    });
    res.status(200).json({
        sucess:true,
        product:product,
    })


}

//delete product --{{base_url}}/api/v1/products/:id
exports.deleteProduct = async(req,res,next)=>{
    let product= await productModel.findById(req.params.id);
    if (!product)
    {
        return res.status(404).json({
            success:false,
            message:"Product not found",
        })
    }
    await product.remove();
    res.status(200).json({
        success:true,
        message:"Product deleted"
    })


}