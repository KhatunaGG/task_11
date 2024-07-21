const { readData } = require('../utils');

const logMiddleware = async (req, res, next) => {
    try {
        const { name } = req.headers;
        if (!name) {
            return res.status(400).send("Username is required");
        }

        const users = await readData('user.json', true);
        console.log(req.headers, 'headers');

        if (!users || users.length === 0) {
            return res.status(400).send("No users found");
        }

        const currentUser = users.find(el => el.name.toLowerCase() === name.toLowerCase());

        if (currentUser) {
            return next();
        } else {
            return res.status(400).send("Username not found");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = logMiddleware;