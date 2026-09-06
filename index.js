const express = require("express");
const app = express();
require("dotenv").config();
const loadDataFromFile = require('./loadData');
const PORT = process.env.PORT || 3000;
app.use(express.json());

let cars;
let globalId;

function checkAndStartServer(err,data){
    if(err){
        console.error(err);
        return;
    }

    cars = data;
    globalId = Math.max(...cars.map(car => car.id)) + 1;
    app.listen(PORT, ()=>{
        console.log(`server started at Port ${PORT}`);
    });
}

//loading data from json and starting the server after that
loadDataFromFile("cars.json", checkAndStartServer);

app.get("/",(req,res)=>{
    res.json({"message" : "here will be the home page"});
});

app.get("/cars",(req,res)=>{
    res.json(cars);
});

app.get("/cars/:id",(req,res)=>{
    const reqCarId = Number(req.params.id);
    const reqCar = cars.find(car => car.id === reqCarId);
    if(!reqCar){
        res.status(404).json({message:"Car not Found"});
    }else{
        res.json(reqCar);
    }
});


app.post("/cars",(req,res)=>{
    const {make , model , year , price} = req.body;

    if(!make || !model || !year || !price){
        return res.status(400).json({message:"make , model , year and price are required please"});
    }

    const newCar = {id : globalId , ...req.body};
    globalId = globalId + 1;
    cars.push(newCar);

    res.status(201).json(newCar);
});

app.put("/cars/:id",(req,res)=>{
    const reqCarId = Number(req.params.id);
    const {make , model , year , price} = req.body;

    if(!make || !model || !year || !price){
        return res.status(400).json({message:"make , model , year and price are required please"});
    }

    let reqCar = cars.find(car => car.id === reqCarId);
    if(!reqCar){
        return res.status(404).json({message:"There is no car with that id"});
    }

    reqCar.make = make;
    reqCar.model = model;
    reqCar.year = year;
    reqCar.price = price;

    res.status(200).json(reqCar);
})

app.delete("/cars/:id",(req,res)=>{
    const reqCarId = Number(req.params.id);
    const reqCar = cars.find(car => car.id === reqCarId);
    if(reqCar){
        cars = cars.filter(car => car.id !== reqCarId);
        res.json({message:`Car with id ${reqCarId} is removed`});
    }else{
        res.status(404).json({message:"Car is Not Found"});
    }
})
