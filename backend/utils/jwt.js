const sendToken = (user, statusCode, res)=> {
    
    //creating JWT token
    const token =  user.getJwtToken();


    res.status(statusCode).json(
        {
            success:true,
            user:user,
            token:token,
        }
    )
};

module.exports = sendToken;