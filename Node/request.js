const http = require('http');

const req = http.request({
    hostname: '127.0.0.1',
    port: 8088,
    path: '/a/d/b?s=qew&v=1.2.2&sada=123&s=123&s=vsvs#asdf',
    method: 'POST'
}, function(res){
    console.log('status：' + res.statusCode);
    console.log('header：' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function(chunk){
        console.log('content：' + chunk);
    })
});

req.end();
