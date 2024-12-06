const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "config/config.env") });
const cors = require("cors");
const products = require("./routes/product");
const auth = require("./routes/auth");
const order = require("./routes/order");
const payment = require("./routes/payment");

//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
//to make the "uploads" folder a static folder to save the user imgs
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1/", products); //1st URL, 2nd Route
app.use("/api/v1/", auth); //1st URL, 2nd Route
app.use("/api/v1/", order);
app.use("/api/v1/", payment);

if (process.env.NODE_ENV === "production") {
  //frontend(build) folder access
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html "))
  })
}
app.use(errorMiddleware); //last middle to be executed incase if the above middleware failed to deal with error messages.
module.exports = app;
