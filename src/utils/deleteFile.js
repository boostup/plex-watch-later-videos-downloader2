const util = require('util');
const fs = require('fs');

const unlink = util.promisify(fs.unlink);

async function deleteFile(filePath) {
    try{
        return await unlink(filePath);
    } catch (error) {
        console.log('error caught: ', error);
    }    
}

module.exports = deleteFile;