const express = require('express')
const app = express()
const fs = require('fs/promises')
const { readData, writeData } = require('./utils')
const apiRouter = require('./api')
const consoleMiddleware = require('./middlewares/console.middleware')


app.use(express.json())
app.use(consoleMiddleware)


app.get('/', (req, res) => {
    res.send('Welcome')
})

app.use('/api', apiRouter)


app.listen(3003, () => {
    console.log('Server is runnin on port http://localhost:3003')
})