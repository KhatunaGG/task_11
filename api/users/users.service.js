const { readData, writeData } = require('../../utils')


const loggedInUser = async (req, res) => {
    try {
        const { name, email } = req.body
        const newUser = {
            name, email
        }
        await writeData('user.json', [newUser])
        const data = await readData('user.json', true)
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