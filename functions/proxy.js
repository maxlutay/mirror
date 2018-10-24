
const https = require("https");
const fs = require("fs");

const source = process.env.SITE;





exports.handler = function (event, context, callback) {

    const to = event.queryStringParameters.to;

    let path = !to ? source : source + "/" + to;
    //let body = `p ${path} s ${source} t ${to} <br> ${JSON.stringify(event)} <br> ${JSON.stringify(context)} <hr>`;

    let body = "";
    if (!source) {
        body += "<h1> omg, wtf</h1>";
        callback(null, {
            statusCode: 500,
            //headers: event.headers,
            body
        });
        return;
    };

    https.get(path, res => {
        res.on("data", d => body += d);
        res.on("end", () => {
            if(/html/.test(res.headers["content-type"]) ){
                body.replace("</body>",`<script defer> ${ fs.readFileSync("../../replacer.js").toString() }</script></body>"`);
                //body += `/*<!-- ${to}       ${JSON.stringify(event)} -->*/`
            }
            
            callback(null, {
                statusCode: 200,
                headers: {
                    "content-type": res.headers["content-type"]
                },
                body,
                isBase64Encoded: /(image|video)/.test(res.headers["content-type"])
            });
        });
    });

}