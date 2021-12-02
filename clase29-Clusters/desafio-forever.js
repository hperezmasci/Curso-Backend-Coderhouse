const http = require('http')

const PORT = process.argv[2] || 8000

http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n')
}).listen(PORT)
