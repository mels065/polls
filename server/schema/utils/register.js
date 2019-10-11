const User = require("../../models/user");

const { validateRegister } = require("./validation");
const createToken = require("./create-token");

module.exports = async (args) => {
    const error = validateRegister(args);
    if (error) return { success: false, message: error.message };

    const emailExists = await User.findOne({ email: args.email });
    if (emailExists) return { success: false, message: "Email already exists" };

    if (args.password !== args.repeatPassword) return { success: false, message: "Passwords do not match" };

    try {
        const user = new User(args);
        await user.save();

        // const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
        // return { success: true, token };
        return createToken(user.id);
    } catch (err) {
        return { success: false, message: err.message }
    }
};
