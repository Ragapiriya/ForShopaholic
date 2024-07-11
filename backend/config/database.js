const mongoose= require('mongoose');
const connectDatabase= ()=>{
    mongoose
    .connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser:true,
        // useUnifiedTopology:true
    })
    .then((con)=>{console.log(`MongoDb is connected to the host: ${con.connection.host}`)})
    .catch((error)=>{console.log(`Error: ${error}`)})
}

module.exports=connectDatabase;