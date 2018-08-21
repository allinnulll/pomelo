const http = require('http');
const url = require('url');
const fs = require('fs');
const querystring = require('querystring');

http.createServer((req, res) => {
    // console.log(url.parse(req.url));
    /* if(req.method !== 'GET' || req.method !== 'POST') {
        res.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});
        res.end();
        return;
    } */
    if(url.parse(req.url).pathname === '/favicon.ico') {
        fs.readFile('./Favicon.ico', (error, data) => {
            res.writeHead(200, {'Content-Type': 'image/webp'});
            res.end(data);
        });
        return;
    }
    if(url.parse(req.url).path === '/usso/router/rest.do?method=api.com.user.lvpound.lvpoundDetail&version=1.0.0') {
        let body = '';
        req.on('data', chunk=>{
            body+=chunk;
        });
        req.on('end', ()=>{
            body = querystring.parse(body);
            console.log(body.pageSize);
        });
        res.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});
        const data = {
            "code": "1",
            "data":   [
                    {
                        "pointLogId": 10000,
                        "userId": 1321,
                        "pointType": "驴镑明细类型：0：获得驴镑，1：消费驴镑，2：过期驴镑",
                        "point": 122,
                        "channelName": "渠道名称",
                        "orderNum": "订单号",
                        "buCode": "订单所属BU",
                        "memo":"备注",
                        "createdDate": "2018-09-09 12:11:11"              
                    },
                    {
                        "pointLogId": 10000,
                        "userId": 1321,
                        "pointType": "驴镑明细类型：0：获得驴镑，1：消费驴镑，2：过期驴镑",
                        "point": 122,
                        "channelName": "渠道名称",
                        "orderNum": "订单号",
                        "buCode": "订单所属BU",
                        "memo":"备注",
                        "createdDate": "2018-09-09 12:11:11"   
                    },
                    {
                        "pointLogId": 10000,
                        "userId": 1321,
                        "pointType": "驴镑明细类型：0：获得驴镑，1：消费驴镑，2：过期驴镑",
                        "point": 122,
                        "channelName": "渠道名称",
                        "orderNum": "订单号",
                        "buCode": "订单所属BU",
                        "memo":"备注",
                        "createdDate": "2018-09-09 12:11:11"   
                    },
                    {
                        "pointLogId": 10000,
                        "userId": 1321,
                        "pointType": "驴镑明细类型：0：获得驴镑，1：消费驴镑，2：过期驴镑",
                        "point": 122,
                        "channelName": "渠道名称",
                        "orderNum": "订单号",
                        "buCode": "订单所属BU",
                        "memo":"备注",
                        "createdDate": "2018-09-09 12:11:11"   
                    },
                    {
                        "pointLogId": 10000,
                        "userId": 1321,
                        "pointType": "驴镑明细类型：0：获得驴镑，1：消费驴镑，2：过期驴镑",
                        "point": 122,
                        "channelName": "渠道名称",
                        "orderNum": "订单号",
                        "buCode": "订单所属BU",
                        "memo":"备注",
                        "createdDate": "2018-09-09 12:11:11"   
                    },
                    {
                        "pointLogId": 10000,
                        "userId": 1321,
                        "pointType": "驴镑明细类型：0：获得驴镑，1：消费驴镑，2：过期驴镑",
                        "point": 122,
                        "channelName": "渠道名称",
                        "orderNum": "订单号",
                        "buCode": "订单所属BU",
                        "memo":"备注",
                        "createdDate": "2018-09-09 12:11:11"   
                    },
                    {
                        "pointLogId": 10000,
                        "userId": 1321,
                        "pointType": "驴镑明细类型：0：获得驴镑，1：消费驴镑，2：过期驴镑",
                        "point": 122,
                        "channelName": "渠道名称",
                        "orderNum": "订单号",
                        "buCode": "订单所属BU",
                        "memo":"备注",
                        "createdDate": "2018-09-09 12:11:11"   
                    },
                    {
                        "pointLogId": 10000,
                        "userId": 1321,
                        "pointType": "驴镑明细类型：0：获得驴镑，1：消费驴镑，2：过期驴镑",
                        "point": 122,
                        "channelName": "渠道名称",
                        "orderNum": "订单号",
                        "buCode": "订单所属BU",
                        "memo":"备注",
                        "createdDate": "2018-09-09 12:11:11"   
                    },
                    {
                        "pointLogId": 10000,
                        "userId": 1321,
                        "pointType": "驴镑明细类型：0：获得驴镑，1：消费驴镑，2：过期驴镑",
                        "point": 122,
                        "channelName": "渠道名称",
                        "orderNum": "订单号",
                        "buCode": "订单所属BU",
                        "memo":"备注",
                        "createdDate": "2018-09-09 12:11:11"   
                    },
                    {
                        "pointLogId": 10000,
                        "userId": 1321,
                        "pointType": "驴镑明细类型：0：获得驴镑，1：消费驴镑，2：过期驴镑",
                        "point": 122,
                        "channelName": "渠道名称",
                        "orderNum": "订单号",
                        "buCode": "订单所属BU",
                        "memo":"备注",
                        "createdDate": "2018-09-09 12:11:11"   
                    }
                ],
            "errorMessage": "",
            "message": "",
            "version": "d111f09bbb74ad3ca150f2acd2aa2f11"
            }
        setTimeout(() => {
            res.end(JSON.stringify(data));
        }, 5000);
        return;
    }

    //console.log(parseCookie(req.headers.cookie)); // 格式化cookie
    req.cookie = parseCookie(req.headers.cookie); // 挂载到req上
    if (!req.cookie || req.cookie.isVisited) res.setHeader('Set-Cookie', 'isVisited=1; Path=/; Expires=' + (new Date().toLocaleDateString()) + ';');
    else res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('./form.html', (error, data) => {
        res.end(data);
    });
    // res.end('<p>for cookie</p>');
}).listen(8088, '10.112.5.41');

parseCookie = (str) => {
    if(!str || typeof str !== 'string') return;
    let [list, obj] = [str.split('; '), {}];
    list.map(l => {
        let ls = l.split('=');
        if(ls[0] && ls[1]) obj[ls[0].trim()] = ls[1].trim();
    })
    return obj;
}