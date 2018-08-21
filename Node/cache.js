const http = require('http');
const fs = require('fs');
const crypto = require('crypto');

const server = http.createServer((req, res) => {
    console.log(1);
    comparisonHandle(req, res);
});

const getHash = (str) => {
    const shasum = crypto.createHash('sha1');
    return shasum.update(str).digest('base64');
}

const comparisonHandle = (req, res) => {
    fs.stat('./cache.json', (error, stat) => {
        // 先进行文件改动的验证，如果没有改动直接304
        const lastModified = stat.mtime.toUTCString();
        if(lastModified === req.headers['if-modified-since']) {
            res.writeHead(304, 'Not Modified');
            res.end();
        } else {
            fs.readFile('./cache.json', (error, file) => {
                // 在进行文件hash值的比对如果没有变化则304
                const hash = getHash(file);
                const noneMatch = req.headers['if-none-match'];
                if(hash === noneMatch) {
                    res.writeHead(304, 'Not Modified');
                    res.end();
                } else {
                    // 只有当改动了且文件有变化时才会返回文件
                    res.setHeader('Last-Modified', lastModified);
                    res.setHeader('Etag', hash);
                    res.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});
                    res.end(file);
                }
            })
        }
    })
}

const ageHandle = (req, res) => {
    fs.readFile('./cache.json', (error, file) => {
        const expires = new Date();
        const cacheTime = 10 * 365 * 24 * 60 * 60 * 1000;
        expires.setTime(expires.getTime() + cacheTime);
        res.setHeader('Expires', expires.toUTCString());
        res.setHeader('Cache-Control', `max-age=${cacheTime}`);
        res.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});
        res.end(file);
    })
}

server.listen(8867, '127.0.0.1');