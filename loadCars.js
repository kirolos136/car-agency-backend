const fs = require('fs');
const path = require('path');

function loadCarsFromFile(callback){
    const filePath = path.join(__dirname,'cars.json');

    fs.readFile(filePath,'utf-8',(err,data)=>{
        if(err){
            return callback(err);
        }

        let parsedCars;

        try{
            parsedCars = JSON.parse(data);
        }catch(parseErr){
            return callback(parseErr);
        }

        callback(null,parsedCars);
    });
}

module.exports = loadCarsFromFile;