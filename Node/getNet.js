const net = require('net');

const client = net.connect({port: 8088}, function(){
    console.log('server connected');
    client.write('world!/n');
});
client.on('data', function(data){
    console.log(data.toString());
    client.end();
})
client.on('end', function(){
    console.log('client disconnect')
})