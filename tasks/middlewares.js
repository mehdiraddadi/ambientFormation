const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello world!'))
app.get('/test', (req, res) => res.send('Hello test!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.use(function(req, res, next) {
    console.log('Time:', Date.now())
    next()
})