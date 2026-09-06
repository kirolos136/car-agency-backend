const fs = require('fs');
const path = require('path');

async function loadDataAsyncAwait(filename){
    const filePath = path.join(__dirname,filename);
    const data = await fs.promises.readFile(filePath,'utf-8');
    const parsedData = JSON.parse(data);
    return parsedData;
}

module.exports = loadDataAsyncAwait;