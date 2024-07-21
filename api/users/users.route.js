const { Router } = require('express')
const { readData, writeData } = require('../../utils')

const usersRouter = Router()

// usersRouter.post('/', async (req, res) => {
//     const { name, email } = req.body
//     const newUser = {
//         name, email
//     }
//     // const user = []
//     // user.push(newUser)
//     await writeData('user.json', [newUser])
//     const data = await readData('user.json', true)

//     res.status(201).json(data)
// })


usersRouter.post('/', async (req, res) => {
    try {
        const { name, email } = req.body
        if (!name || !email) {
            return res.status(400).json('Name and email are required');
        }
        const newUser = {
            name, email
        }
        
        const currentUser = await readData('user.json', true)
        currentUser.push(newUser)
        await writeData('user.json', currentUser)
        // const user = []
        // user.push(newUser)

        // const data = await readData('user.json', true)

        res.status(201).json(currentUser)

    } catch (error) {
        console.log(error)
    }
})



usersRouter.get('/', async (req, res) => {
    const data = await readData('user.json', true)
    res.json(data)
})

module.exports = usersRouter