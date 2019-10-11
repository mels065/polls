const { Schema, model } = require("mongoose");

const PollSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, ref: "User" },
    question: { type: String, required: true },
});

module.exports = model("Poll", PollSchema);
