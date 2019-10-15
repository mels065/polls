const jwt = require("jsonwebtoken");

const User = require("../../models/user");

module.exports = next => async (root, args, context) => {
    const authToken = context.headers["auth-token"];
    if (authToken) {
        try {
            const payload = jwt.verify(authToken, process.env.TOKEN_SECRET);
            context.user = await User.findById(payload.id);
            return next(root, args, context);
        } catch (err) {
            throw err;
        }
    }
}
