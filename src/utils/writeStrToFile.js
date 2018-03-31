const util = require('util');
const fs = require('fs');

const writeFile = util.promisify(fs.writeFile);

async function writeStrToFile(filePath, contents) {
    try{
        return await writeFile(filePath, contents);
    } catch (error) {
        console.log('error caught: ', error);
    }    
}

module.exports = writeStrToFile;