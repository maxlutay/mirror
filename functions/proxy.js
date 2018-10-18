
const https = require("https");

const source = process.env.SITE





exports.handler = function (event, context, callback) {

    let body = ` ${JSON.stringify(event)} <br> ${JSON.stringify(context)} <br>`;



    if (!!source) {
        https.get(source, res => {
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