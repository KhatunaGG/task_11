const express = require('express')
const app = express()
const fs = require('fs/promises')
const apiRouter = require('./api')
const consoleMiddleware = require('./middlewares/console.middleware')
const { writeData, readData } = require('./utils')

const path = require('path')


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


app.get('/shopping/clients', async (rq, res) => {
    const data = await readData('shop.json', true)
    res.json(data)
})


// ააწყეთ დინამიური ფეიჯი რომლეიც აიდით წამოიღებს ხარჯების ობიექტს
// ააწყეთ view გვერდი სადაც დარენდერდება ყველა დამატებული ხარჯი


app.post('/shopping/clients', async (req, res) => {
    try {
        const { name, purchase } = req.body
        if (!name) return res.status(400).json({ success: false, message: 'name is required' })
        const data = await readData('shop.json', true)

        const lastId = data[data.length - 1]?.id || 1
        const newClient = { name, purchase, id: lastId + 1 }
        data.push(newClient)

        console.log(lastId, 'lastid')
        console.log(newClient, 'newclient')

        await writeData('shop.json', data)
        res.status(200).json(data)

    } catch (error) {
        console.log(error)
    }
})

app.get('/shopping/client/:id', async (req, res) => {
    try {
        const data = await readData('shop.json', true)
        const { id } = req.params
        const client = data.find(el => el.id === Number(id))
        if (!client) return res.status(400).json('Client ot found')
        res.render(path.join(__dirname, 'views', 'pages', 'expense.ejs'), { client })

    } catch (error) {
        console.log(error)
    }

})



app.listen(3003, () => {
    console.log('Server is runnin on port http://localhost:3003')
})