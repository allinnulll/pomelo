const http = require('http');

const req = http.request({
    hostname: '127.0.0.1',
    port: 8089,
    path: '/',
    method: 'GET'
}, function(res){
    console.log('status：' + res.statusCode);
    console.log('header：' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function(chunk){
        console.log('content：' + chunk);
    })
});

req.end();