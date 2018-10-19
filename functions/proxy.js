
const https = require("https");

const source = process.env.SITE





exports.handler = function (event, context, callback) {

    let body = `${source} <br> ${JSON.stringify(event)} <br> ${JSON.stringify(context)} <hr>`;

    const path = event.path.replace(new RegExp("./.netlify/functions/proxy/","g"),"./");

    if (!!source) {
        https.get(!path ? source : source + path, res => {
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