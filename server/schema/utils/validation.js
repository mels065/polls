const Joi = require("@hapi/joi");

const username = Joi.string()
    .min(8)
    .max(30)
    .required();
const email = Joi.string()
    .email()
    .required();
const password = Joi.string()
    .min(8)
    .max(30)
    .pattern(/[a-zA-Z]/)
    .pattern(/\d/)
    .pattern(/[!@#\$%\^&]/)
    .required();

const validateRegister = (args) => {
    const { error } = Joi.object({
        username,
        email,
        password,
        repeatPassword: password
    }).validate(args);
    return error;
};

const validateLogin = (args) => {
    const { error } = Joi.object({
        email,
        password
    }).validate(args);
    return error;
};

module.exports = {
    validateRegister,
    validateLogin,
};
