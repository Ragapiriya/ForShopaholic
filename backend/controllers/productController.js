const productModel= require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError= require('../middlewares/catchAsyncError');
const APIfeatures =  require('../utils/apiFeatures');

//get products - {{base_url}}/api/v1/products/
//it is a handler function
exports.getProducts = async (req, res, next) => {
    const resultPerPage = 2;
    const apiFeatures = new APIfeatures(productModel.find(), req.query).filter().search().paginate(resultPerPage);
    const products = await apiFeatures.query;
    // const products = await productModel.find();
    res.status(200).json({ 
        success: true,
        count: products.length,
        products: products,
    });
};

//create product - {{base_url}}/api/v1/products/new/
//it is a handler function
exports.newProduct = catchAsyncError (async (req,res,next)=>{
    const product = await productModel.create(req.body);
    res.status(201).json({
        success:true,
        product: product
    })
})



//get single product - {{base_url}}/api/v1/product/:id
//it is a handler function 
exports.getSingleProduct = async (req,res,next)=>{ 
    const product= await productModel.findById(req.params.id);
    if (!product)
    {
     
        return next(new ErrorHandler("Product Not Found",404));  //this is a object passed to next middleware bcuz it shoule be returned without going further donw to succes message.
        

    }

    res.status(200).json({
        success:true,
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
    product = await productModel.findByIdAndUpdate(req.params.id,req.body,{
        new:true,  //to only get the new product, not the old one
        runValidators:true, //it will check whether the input satisfy the validation/condition we mentioned in the schema (required field) And if the data is not in the correct form, it will show the error msg we gave.

    });
    res.status(200).json({
        sucess:true,
        product:product,
    })


}

//delete product --{{base_url}}/api/v1/products/:id
exports.deleteProduct = async(req,res,next)=>{
    try {
                // const product= await productModel.findById(req.params.id);
        const product = await productModel.findById(req.params.id);
        if (!product)
        {
            return res.status(404).json({
                success:false,
                message:"Product not found",
            })
        }
        // await product.remove();
        await product.remove();
        res.status(200).json({
            success:true,
            message:"Product deleted" 
        });
    }
    catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
   


}