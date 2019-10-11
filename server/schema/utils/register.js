const Joi = require("@hapi/joi");

const User = require("../../models/user");

module.exports = async (args) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(8)
            .max(30)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .pattern(/^[a-zA-Z0-9]{8,30}/)
            .required(),
        repeatPassword: Joi.string()
            .pattern(/^[a-zA-Z0-9]{8,30}/)
            .required(),
    });
    const { error } = schema.validate(args);
    if (error) return { success: false, message: error.message };

    const emailExists = this.find({ email: args.email });
    if (emailExists) return { success: false, message: "Email already exists" };

    try {
        const user = new this(args);
        await user.save();

        const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
        return { success: true, token };
    } catch (err) {
        return { success: false, message: err.message }
    }
};
