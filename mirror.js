const params = require("./params");
const proxy = require("http-proxy");
proxy.createProxyServer({target:params.SITE}).listen(params.PORT);