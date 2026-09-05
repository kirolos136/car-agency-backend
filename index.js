const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/",(req,res)=>{
    res.json({"message" : "here will be a list of cars"});
});

app.listen(PORT, ()=>{
    console.log(`server started at Port ${PORT}`);
});