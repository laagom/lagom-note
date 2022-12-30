const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/dog', (req, res) => {
    res.send('멍멍')
})

app.get('/cat', (req, res) => {
    res.send('<h1>야옹</h1>')
})

// app.get('/user/:id', (req, res) => {
//     const param = req.params
//     console.log(param)
//     console.log(param.id)

//     res.json({'animal': param.id})
// })

app.get('/user/query', (req, res) => {
    const query = req.query
    console.log(query)

    res.json(query)
})

app.get('/sound/:name', (req, res) => {
    const { name } = req.params

    if(name == 'dog') {
        res.json('멍멍')
    }else if(name == 'cat') {
        res.json('야옹')
    }else if(name == 'pig') {
        res.json('꿀꿀')
    }else{
        res.json('알수 없음!!')
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})