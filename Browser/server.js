// server.js
var http = require('http');
var URL = require('url');
var fs = require('fs');
var server = http.createServer(function (req, res) {
    if (req.method != 'GET') {
        return res.end('send me a get request\n');
    } else {
        var url = URL.parse(req.url, true);
        var params = url.query;
        if (url.pathname === '/test.html') {
            res.writeHead(200, {'Content-Type': 'text/html'});
            fs.createReadStream('test.html').pipe(res);
        } else if (url.pathname === '/test.css') {
            res.writeHead(200, {'Content-Type': 'text/css'});
            if (params.defer) {
                setTimeout(function(){fs.createReadStream('test.css').pipe(res)}, 3000);
            } else {
                fs.createReadStream('test.css').pipe(res);
            }
        } else if (url.pathname === '/test.js') {
            res.writeHead(200, {'Content-Type': 'application/javascript'});
            if (params.defer) {
                setTimeout(function(){fs.createReadStream('test.js').pipe(res)}, 3000);
            } else {
                fs.createReadStream('test.js').pipe(res);
            }
        }
    }
});
server.listen(8888);
console.log('sever start');