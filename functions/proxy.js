
const https = require("https");

const source = process.env.SITE





exports.handler = function(event, context, callback) {
    
    let body = ` ${JSON.stringify(event)}\n ${JSON.stringify(context)}\n`;

    let cb = callback.bind(null,null, {
        statusCode: 200,
        body
    });

    if(!!source){
        https.get(source,res => {
            res.on("data", d => body += d);
            res.on("end", () => cb() )
        });
    }else {
        body += "<h1> omg, wtf</h1>";
        cb();
    }
    


}