
const https = require("https");

const source = process.env.SITE





exports.handler = function (event, context, callback) {
    
    const path = event.path.replace( /\.netlify/functions/proxy/g ,"");
    
    let to = !path ? source : source + path;
    //let body = `p ${path} s ${source} t ${to} <br> ${JSON.stringify(event)} <br> ${JSON.stringify(context)} <hr>`;

    let body="";
    if (!!source) {
        https.get(to, res => {
            res.on("data", d => body += d);
            res.on("end", () => {
                body += `/*<!-- ${to} -->*/`
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
    };



}