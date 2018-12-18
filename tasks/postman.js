var http = require('http')

const server = http.createServer((req, res) => {
    if(req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString(); // convert buffer to string
        })
        req.on('end', () => {
            console.log(body)
            res.end('ok')
        })
    }
})

server.listen(2000, function () {
    console.log('Example app listening on port 2000!')
})