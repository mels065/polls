const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

UserSchema.pre("save", async function(next) {
    const user = this;

    if (!user.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt();

        user.set(
            "password",
            await bcrypt.hash(user.get("password"), salt),
        );
        next();
    } catch (err) {
        return next(err);
    }
});

module.exports = model("User", UserSchema);
