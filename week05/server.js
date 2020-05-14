const http = require("http")

const server = http.createServer((req,res)=>{
    console.log('get client massage')
    console.log(req.headers)
    res.setHeader('Content-Type','text/html');
    res.setHeader('X-Foo','bar');
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('are you ok?yes,i am fine.');
})

server.listen(8088)
