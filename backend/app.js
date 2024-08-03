const express = require('express')
const app= express();
const products = require('./routes/product');
const errorMiddleware=require('./middlewares/error');


app.use(express.json());
app.use('/api/v1/',products) //1st URL 2nd Route




app.use(errorMiddleware);  //last middle to be executed incase if the above middleware failed to deal with error messages.
module.exports=app;