const http = require('http');

const server = http.createServer(function(req, res){
    console.log('连接成功');
    // res.writeHead(200, {'Content-Type': 'text/plain'});
    res.writeHead(301, {'Location': 'https://www.baidu.com'})
    res.write('hello world!');
    res.end();
});

server.listen(8089, '127.0.0.1');