const fs = require('fs');
const path = require('path');

function loadFilePromise(filename){
    const filePath = path.join(__dirname,filename)

    return fs.promises.readFile(filePath,'utf-8').then((data) => JSON.parse(data));
}

module.exports = loadFilePromise;