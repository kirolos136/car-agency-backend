const fs = require('fs');
const path = require('path');

function loadDataFromFile(filename,callback){
    const filePath = path.join(__dirname,filename);

    fs.readFile(filePath,'utf-8',(err,data)=>{
        if(err){
            return callback(err);
        }

        let parsedData;

        try{
            parsedData = JSON.parse(data);
        }catch(parseErr){
            return callback(parseErr);
        }

        callback(null,parsedData);
    });
}

module.exports = loadDataFromFile;