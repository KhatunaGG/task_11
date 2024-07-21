const { Router, application } = require('express')
const apiRouter = Router()
const { readData, writeData } = require('../utils')
const productsRouter = require('./products/products.route')
const usersRouter = require('./users/users.route')
const logMiddleware = require('../middlewares/log.middleware')



apiRouter.use('/products', logMiddleware, productsRouter)
apiRouter.use('/users',  usersRouter)



module.exports = apiRouter