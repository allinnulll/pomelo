const http = require('http');
const sessions = {};
const key = 'session_id';
const EXPIRES = 20 * 60 * 1000;

// session
const generate = () => {
    const session = {};
    session.id = (new Date()).getTime() + Math.random();
    session.cookie = {
        expire: (new Date()).getTime() + EXPIRES
    };
    sessions[session.id] = session;
    return session;
};
const checkSession = (req, res) => {
    const id = req.cookies[key];
    if(!id){
        req.session = generate();
    } else {
        const session = sessions[id];
        if(session){
            if(session.cookie.expire > (new Date()).getTime()){
                // 更新有效期
                session.cookie.expire = (new Date()).getTime() + EXPIRES;
                req.session = session;
            } else {
                // 过期，重新生成
                delete sessions[id];
                req.session = generate();
            }
        } else {
            req.session = generate();
        }
    }
};

// cookie
const parseCookie = (cookie) => {
    const cookies = {};
    if(!cookie) return cookies;
    const list = cookie.split(';');
    list.map(l => {
        const pair = l.split('=');
        cookies[pair[0].trim()] = pair[1];
    })
    return cookies;
};
const apendCookie = (req, res) => {
    req.cookies = parseCookie(req.headers.cookie);
};
const serializeCookie = (name, val, opt) => {
    const pairs = [`${name}=${val}`];
    opt = opt || {};
    if(opt.maxAge) pairs.push(`Max-Age=${opt.maxAge}`);
    if(opt.domain) pairs.push(`Domain=${opt.domain}`);
    if(opt.path) pairs.push(`Path=${opt.path}`);
    if(opt.expires) pairs.push(`Expires=${opt.expires}`);
    if(opt.httpOnly) pairs.push(`HttpOnly`);
    if(opt.secure) pairs.push('Secure');
    return pairs.join('; ');
};
const setSession = (req, res) => {
    const writeHead = res.writeHead;
    res.writeHead = function(){
        let cookies = res.getHeader('Set-Cookie');
        const session = serializeCookie(key, req.session.id);
        if(cookies) cookies = Array.isArray(cookies) ? cookies.concat(session) : [cookies, session];
        else cookies = session;
        res.setHeader('Set-Cookie', cookies);
        return writeHead.apply(this, arguments);
    }
};


const server = http.createServer((req, res)=>{
    apendCookie(req, res);
    checkSession(req, res);
    setSession(req, res);
    if(req.session.isVisited) {
        res.writeHead(200,{'Content-Type': 'text/plain;charset=UTF-8'});
        res.end('欢迎再次光临！');
    } else {
        req.session.isVisited = true;
        res.writeHead(200,{'Content-Type': 'text/plain;charset=UTF-8'});
        res.end('感谢您的光临！');
    }
});

server.listen(8866, '127.0.0.1');