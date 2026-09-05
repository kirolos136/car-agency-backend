// example array
let cars = [
  {
    id: 1,
    make: "Toyota",
    model: "Corolla",
    year: 2022,
    price: 20000,
    mileage: 15000,
    color: "White",
    fuelType: "Petrol",
    transmission: "Automatic",
    available: true
  },
  {
    id: 2,
    make: "Toyota",
    model: "Camry",
    year: 2021,
    price: 25000,
    mileage: 30000,
    color: "Black",
    fuelType: "Petrol",
    transmission: "Automatic",
    available: false
  },
  {
    id: 3,
    make: "Honda",
    model: "Civic",
    year: 2023,
    price: 22000,
    mileage: 5000,
    color: "Blue",
    fuelType: "Petrol",
    transmission: "Manual",
    available: true
  },
  {
    id: 4,
    make: "Hyundai",
    model: "Elantra",
    year: 2020,
    price: 15000,
    mileage: 45000,
    color: "Silver",
    fuelType: "Petrol",
    transmission: "Automatic",
    available: true
  }
];

const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/",(req,res)=>{
    res.json({"message" : "here will be the home page"});
});

app.get("/cars",(req,res)=>{
    res.json(cars);
});

app.get("/cars/:id",(req,res)=>{
    const reqCarId = Number(req.params.id);
    const reqCar = cars.filter(car => car.id === reqCarId);
    if(reqCar.length === 0){
        res.status(404).json({message:"Car not Found"});
    }else{
        res.json(reqCar);
    }
});

let globalId = cars.length + 1;

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

app.listen(PORT, ()=>{
    console.log(`server started at Port ${PORT}`);
});