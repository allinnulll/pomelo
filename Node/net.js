const net  = require('net');

const server = net.createServer(function(socket){
    socket.on('data', function(data){
        console.log(data.toString());
        socket.write('你好');
    });
    socket.on('end', function(){
        console.log('断开连接')
    });
    socket.write('hello world');
});

server.listen('8088', function(){
    console.log('server bound');
})