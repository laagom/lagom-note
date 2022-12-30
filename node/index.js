const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/dog', (req, res) => {
    res.send('멍멍')
})

app.get('/cat', (req, res) => {
    res.send('<h1>야옹</h1>')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})