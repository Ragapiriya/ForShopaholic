// This is where we will use enviornment variables
const app = require('./app')
const dotenv= require('dotenv'); //module
const pathModule= require('path');
const connectDatabase = require('./config/database');


// dotenv.config({path:"config/config.env"})
dotenv.config({path:pathModule.join(__dirname,"config/config.env")})
connectDatabase();
app.listen(process.env.PORT,()=>{console.log(`Server listening to the port ${process.env.PORT} in ${process.env.NODE_ENV}`)});
//within template string
  