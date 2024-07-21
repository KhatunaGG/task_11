
const consoleMiddleware = (req, res, next) => {
    console.log(req.headers['user-agent'])
    next()
}

module.exports = consoleMiddleware