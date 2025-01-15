



const path = require('path');
const { extract } = require('file-icon-extractor');


const extractFromExe = (appPath) => {

    const tempDestPath = require('os').homedir();
    const basename = path.basename(appPath, path.extname(appPath));
    extract(appPath, tempDestPath);
    return path.join(tempDestPath, `${basename}.png`);

};


module.exports = { extractFromExe };


