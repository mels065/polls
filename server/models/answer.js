const { Schema, model } = require("mongoose");

const AnswerSchema = new Schema({
    pollId: { type: Schema.Types.ObjectId, ref: "User" },
    label: { type: String },
    voters: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = model("Answer", AnswerSchema);
