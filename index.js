require("dotenv").config();
const express = require("express");
const app = express();
const carsRouter = require('./routes/cars.js');

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req,res,next)=>{
    console.log(`This is from the main app : Method is ${req.method} and the route is ${req.originalUrl}`);
    next();
})

app.get("/",(req,res)=>{
    res.json({"message" : "here will be the home page"});
});

app.use('/cars' , carsRouter);

app.use((err,req,res,next)=>{
    console.log(`The error is ${err.toString()}`);
    return res.status(500).json({'message':'something went wrong'});
})

app.listen(PORT, ()=>{
    console.log(`server started at Port ${PORT}`);
});