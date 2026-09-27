const express = require('express');
const carsRouter = express.Router();

carsRouter.use((req,res,next)=>{
    console.log(`This Request is handled From Cars Router : Method is ${req.method} and Route is ${req.originalUrl}`);
    next();
})

function validateCars(req,res,next){
    const {make , model , year , price} = req.body;

    if(!make || !model || !year || !price){
        return res.status(400).json({message:"make , model , year and price are required please"});
    }

    next();
}

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


carsRouter.get("/",(req,res)=>{
    res.json(cars);
});

carsRouter.get("/:id",(req,res)=>{
    const reqCarId = Number(req.params.id);
    const reqCar = cars.find(car => car.id === reqCarId);
    if(!reqCar){
        res.status(404).json({message:"Car not Found"});
    }else{
        res.json(reqCar);
    }
});

let globalId = Math.max(...cars.map(car => car.id)) + 1;

carsRouter.post("/", validateCars ,(req,res)=>{

    const newCar = {id : globalId , ...req.body};
    globalId = globalId + 1;
    cars.push(newCar);

    res.status(201).json(newCar);
});

carsRouter.put("/:id", validateCars ,(req,res)=>{
    const reqCarId = Number(req.params.id);
    const {make , model , year , price} = req.body;

    let reqCar = cars.find(car => car.id === reqCarId);
    if(!reqCar){
        return res.status(404).json({message:"There is no car with that id"});
    }

    reqCar.make = make;
    reqCar.model = model;
    reqCar.year = year;
    reqCar.price = price;

    res.status(200).json(reqCar);
});

carsRouter.delete("/:id",(req,res)=>{
    const reqCarId = Number(req.params.id);
    const reqCar = cars.find(car => car.id === reqCarId);
    if(reqCar){
        cars = cars.filter(car => car.id !== reqCarId);
        res.json({message:`Car with id ${reqCarId} is removed`});
    }else{
        res.status(404).json({message:"Car is Not Found"});
    }
});

module.exports = carsRouter ;