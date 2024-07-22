const { readData, writeData } = require('../../utils')

const loggedInUser = async (req, res) => {
    try {
        const { name, email } = req.body
        const data = await readData('user.json', true)
        const lastId = data[data.length - 1]?.id || 0
        if(!name || !email) return res.status(400).json('Name and email address are required')
        const newUser = {
            name, email, id: lastId + 1
        }
        data.push(newUser)
        await writeData('user.json', data)
        res.status(201).json(data)
    } catch (error) {
        console.log(error)
    }
}


const getUser = async (req, res) => {
    try {
        const data = await readData('user.json', true)
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}


module.exports = { getUser, loggedInUser }