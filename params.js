const process = require("process");


module.exports =  {
    PORT: process.argv[2],
    SITE: process.argv[3]
};

console.log(`port: ${module.exports.PORT},source: ${module.exports.SITE}`);
