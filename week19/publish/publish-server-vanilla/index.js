const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
    console.log(res)
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});

server.listen(8084)
