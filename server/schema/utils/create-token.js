const jwt = require("jsonwebtoken");

module.exports = (id) => {
    try {
        return { success: true, token: jwt.sign({ id }, process.env.TOKEN_SECRET) };
    } catch (err) {
        throw err;
    }
}
