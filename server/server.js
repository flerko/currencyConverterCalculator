var host = "127.0.0.1";
var port = 8080;

var cors_proxy = require("cors-anywhere");
cors_proxy.createServer({
    originWhitelist: [],
    requireHeader: [],
    removeHeaders: []
}).listen(port, host, function() {
    console.log("Running CORS Anywhere on " + host + ":" + port);
});
