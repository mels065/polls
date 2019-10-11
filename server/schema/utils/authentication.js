const jwt = require("jsonwebtoken");

const User = require("../../models/user");

module.exports = next => (root, args, context) => {
    const authToken = context.getHeader("auth-token");
    if (authToken) {
        try {
            const payload = jwt.verify(authToken, process.env.TOKEN_SECRET);
            context.user = new User.findById(payload.id);
            next(root, args, context);
        } catch (err) {
            throw err;
        }
    }
}
