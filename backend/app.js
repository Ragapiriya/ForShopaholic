const express = require("express");
const app = express();
const products = require("./routes/product");
const auth = require("./routes/auth");
const order = require("./routes/order"); 
const errorMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const path = require("path");

//middlewares
app.use(express.json());
app.use(cookieParser());
//to make the "uploads" folder a static folder to save the user imgs
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1/", products); //1st URL, 2nd Route
app.use("/api/v1/", auth); //1st URL, 2nd Route
app.use("/api/v1/", order);

app.use(errorMiddleware); //last middle to be executed incase if the above middleware failed to deal with error messages.
module.exports = app;
