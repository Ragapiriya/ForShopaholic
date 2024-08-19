//contains authentication related request handlers.

const userModel = require('../models/userModel');
const catchAsyncError = require('../middlewares/catchAsyncError');



exports.registerUser = catchAsyncError(async(req,res,next)=>{
    const {name,email,password,avatar} = req.body;
    const user = await userModel.create(
        {
            name,
            email,
            password,
            avatar
        }
    )
    res.status(201).json({
        success:true,
        user:user,
    })
})