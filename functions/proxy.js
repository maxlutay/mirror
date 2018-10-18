
const http = require("http");

const source = process.env.SITE
let body;

if(!!source){
    body = http.get(source);
}else {
    body = "<h1> omg, wtf</h1>";
}




exports.handler = function(event, context, callback) {
    callback(null, {
    statusCode: 200,
    body
    });
}