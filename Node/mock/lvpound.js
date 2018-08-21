const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const mData = require('./data.js');

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.all('/usso/router/rest.do', (req, res, next) => {
    console.log(req.body);
    const reqData = req.query;
    const reqBody = req.body;
    if(!reqData.method) return next();
    if(reqData.method === 'api.com.user.lvpound.lvpoundDetail'){
        // ?method=api.com.user.lvpound.lvpoundDetail&version=1.0.0
        const data = mData.detail[reqBody.pointType];
        if(reqBody.pointType == 2) {
            setTimeout(() => {
                res.send(data);
            }, 3000);
        } else res.send(data);
    } else if(reqData.method === 'api.com.user.lvpound.obtainLvpoundLevel') {
        // ?method=api.com.user.lvpound.obtainLvpoundLevel&version=1.0.0
        const data = mData.rule.buy;
        setTimeout(() => {
            res.send(data);
        }, 800);
    } else if(reqData.method === 'api.com.user.lvpound.consumeLvpound') {
        // method=api.com.user.lvpound.consumeLvpound&version=1.0.0
        const data = mData.rule.spend;
        setTimeout(() => {
            res.send(data);
        }, 800);
    } else if(reqData.method === 'api.com.user.lvpound.lvpoundGoodsTypeList') {
        // method=api.com.user.lvpound.lvpoundGoodsTypeList&version=1.0.0
        const data = mData.lvpoundGoodsTypeList;
        setTimeout(() => {
            res.send(data);
        }, 800);
    } else if(reqData.method === 'api.com.user.lvpound.recommendExchangeGoodsList') {
        // method=api.com.user.lvpound.recommendExchangeGoodsList&version=1.0.0
        const data = mData.recommendExchangeGoodsList;
        setTimeout(() => {
            res.send(data);
        }, 800);
    } else if(reqData.method === 'api.com.user.getUser') {
        // ?method=api.com.user.getUser&version=1.0.0`
        const data = mData.getUser;
        setTimeout(() => {
            res.send(data);
        }, 800);
    } else if(reqData.method === 'api.com.user.lvpound.goodsList') {
        // ?method=api.com.user.lvpound.goodsList&version=1.0.0
        console.log(reqBody.startRow);
        const data = mData.goodsList[reqBody.startRow];
        setTimeout(() => {
            res.send(data);
        }, 800);
    } else if(reqData.method === 'api.com.user.getUserConstValue') {
        // ?method=api.com.user.getUserConstValue&version=1.0.0
        const data = mData.getUserConstValue;
        setTimeout(() => {
            res.send(data);
        }, 800);
    } else {
        next();
    }
});
server.post('/api/router/rest.do', (req, res, next)=>{
    const reqData = req.query;
    const reqBody = req.body;
    if(!reqData.method) return next();
    if(reqData.method === 'api.com.user.lvpound.getLvpoundPoint') {
        // method=api.com.user.lvpound.getLvpoundPoint&version=1.0.0
        const data = mData.point;
        setTimeout(() => {
            res.send(data);
        }, 800);
    } else next();
})

server.listen(8088, '10.112.5.41');