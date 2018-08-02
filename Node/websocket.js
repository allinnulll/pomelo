const http = require('http');
const crypto = require('crypto');
const WebSocket = require('ws');

const server = http.createServer(function(req, res){
    res.writeHead(200, {'Content': 'text/plain'});
    res.write('hello world!');
    res.end();
});

server.listen(8090, '127.0.0.1');

server.on('upgrade', function(req, socket, upgradeHead){
    console.log(JSON.stringify(upgradeHead))
    let head = new Buffer(upgradeHead.length);
    upgradeHead.copy(head);
    let key = req.headers['sec-websocket-key'];
    let shasum = crypto.createHash('sha1');
    key = shasum.update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64');
    let headers = [
        'HTTP/1.1 101 Switching Protocols',
        'Upgrade: websocket',
        'Connection: Upgrade',
        'Sec-WebSocket-Accept: ' + key
        // 'Sec-WebSocket-Protocol: ' + protocol
    ];
    socket.setNoDelay(true);
    socket.write(headers.concat(',').join('\r\n'));
    let websocket = new WebSocket();
    websocket.setSocket(socket);
});