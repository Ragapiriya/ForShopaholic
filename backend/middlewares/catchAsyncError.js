module.exports= func => (req,res,next)=>{
    return Promise.resolve(func(req,res,next)).catch(next)  //getting the function argument?? and if there are errors sending them to the next middleware
    //take the asynchronous errors and sending them into "error"middleware
    //execution will be return here
}
//OR
// module.exports= func => (req,res,next)=>Promise.resolve(func(req,res,next)).catch(next)  