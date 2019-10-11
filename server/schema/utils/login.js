const User = require("../../models/user");

const { validateLogin } = require("./validation");
const createToken = require("./create-token");

module.exports = async (args) => {
    const error = validateLogin(args);
    if (error) return { success: false, message: error.message };

    try {
        const user = await User.findOne({ email: args.email });
        if (!user || !(await user.checkPassword(args.password)))
            return { success: false, message: "Email or password is invalid" };
    
        return createToken(user.id);
    } catch(err) {
        return { success: false, message: err.message };
    }
};
