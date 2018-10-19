
const https = require("https");

const source = process.env.SITE





exports.handler = function (event, context, callback) {
    
    const path = event.path.replace(new RegExp(".netlify/functions/proxy/","g"),"");
    
    let to = !path ? source : source + path;
    let body = `${to} <br> ${JSON.stringify(event)} <br> ${JSON.stringify(context)} <hr>`;


    if (!!source) {
        https.get(to, res => {
            res.on("data", d => body += d);
            res.on("end", () => {
                body += "<hr>";
                callback(null, {
                    statusCode: 200,
                    body
                });
            });
        });
    } else {
        body += "<h1> omg, wtf</h1>";
        callback(null, {
            statusCode: 200,
            body
        });
    }



}