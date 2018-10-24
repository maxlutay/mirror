
const https = require("https");

const source = process.env.SITE





exports.handler = function (event, context, callback) {

    const to = event.queryStringParameters.to;

    let path = !path ? source : source + "/" + path;
    //let body = `p ${path} s ${source} t ${to} <br> ${JSON.stringify(event)} <br> ${JSON.stringify(context)} <hr>`;

    let body = "";
    if (!!source) {
        https.get(path, res => {
            res.on("data", d => body += d);
            res.on("end", () => {
                body += `/*<!-- ${to}       ${JSON.stringify(event)} -->*/`
                callback(null, {
                    statusCode: 200,
                    //headers: event.headers,
                    body
                });
            });
        });
    } else {
        body += "<h1> omg, wtf</h1>";
        callback(null, {
            statusCode: 500,
            //headers: event.headers,
            body
        });
    };



}