
const https = require("https");

const source = process.env.SITE





exports.handler = function(event, context, callback) {
    
    let body = "" + JSON.stringify(event) + JSON.stringify(context);
    
    if(!!source){
        body = https.get(source).body;
    }else {
        body = "<h1> omg, wtf</h1>";
    }
    

    callback(null, {
    statusCode: 200,
    body
    });
}