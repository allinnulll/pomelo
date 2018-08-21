const http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    console.log(req.method); // 请求方法
    console.log(req.url); // 请求的url，不包含hostname包含hash
    console.log(url.parse(req.url)); // 格式化url
    /* {
        protocol: null,
        slashes: null,
        auth: null,
        host: null,
        port: null,
        hostname: null,
        hash: '#asdf',
        search: '?s=qew&v=1.2.2', 查询字符串
        query: 's=qew&v=1.2.2', 查询参数
        pathname: '/a/d/b', 路径值
        path: '/a/d/b?s=qew&v=1.2.2',
        href: '/a/d/b?s=qew&v=1.2.2#asdf' 
    } */
    console.log(querystring.parse(url.parse(req.url).query)); // 格式化查询参数
    console.log(url.parse(req.url, true).query); // url.parse第二个参数，深度格式化
    // { s: 'qew', v: '1.2.2' }
    req.query = url.parse(req.url, true).query; // 挂载到req对象上
    /* 
        如果query里的key出现多次，那么它的值会是个集合数组
        s=qew&v=1.2.2&sada=123&s=123&s=vsvs
        { s: [ 'qew', '123', 'vsvs' ], v: '1.2.2', sada: '123' } 
    */
    console.log(req.query);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('success!');
});
server.listen(8088, '127.0.0.1');