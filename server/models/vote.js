const { Schema, model } = require("mongoose");

const VoteSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    pollId: { type: Schema.Types.ObjectId, ref: "Poll", required: true },
    answerIndex: { type: Number, required: true }
});

module.exports = model("Vote", VoteSchema);
