const { Router } = require('express')
const { loggedInUser, getUser } = require('./users.service')
const usersRouter = Router()

usersRouter.post('/', loggedInUser)
usersRouter.get('/', getUser)

module.exports = usersRouter