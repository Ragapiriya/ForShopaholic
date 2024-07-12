const express = require('express')
const app= express();
const products = require('./routes/product');


app.use('/api/v1/',products) //1st URL 2nd Route

module.exports=app;