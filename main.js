const express = require('express')
const app = express()
const fs = require('fs/promises')
const apiRouter = require('./api')
const consoleMiddleware = require('./middlewares/console.middleware')


// ააწყეთ პროდუქტების ქრადი სადაც გამოიყენეთ routes შეეცადეთ გააკეთოთ 
// users.route.js და users.service.js ფაილი, და შექმენით მიდდლიერი რომელიც 
// რაღაც ლოგიკით ან გაატარებს ან დაბლოკავს იუზრების რესურსს.
// შექმენით middleware რომელიც ყოველი რექუესთისას დალოგავს მომხმარებლის user-agent-ს.


app.use(express.json())
app.use(consoleMiddleware)


app.get('/', (req, res) => {
    res.send('Welcome')
})

app.use('/api', apiRouter)


app.listen(3003, () => {
    console.log('Server is runnin on port http://localhost:3003')
})