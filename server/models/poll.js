const { Schema, model } = require("mongoose");

const Vote = require("./vote");

const PollSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, ref: "User" },
    question: { type: String, required: true },
    answers: { type: [String] },
    createdOn: { type: Date, default: Date.now }
});

PollSchema.pre("remove", async function(next) {
    try {
        await Vote.deleteMany({ pollId: this.get("id") });
        next();
    } catch(err) {
        next(err);
    }
})

PollSchema.method("vote", async function(userId, answerIndex) {
    const poll = this;
    await Vote.deleteMany({
        pollId: poll.get("id"),
        userId
    });
    const vote = new Vote({
        pollId: poll.get("id"),
        userId,
        answerIndex
    });
    return await vote.save();
});

PollSchema.method("unvote", async function(userId, answerIndex) {
    const poll = this;
    return await Vote.findOneAndDelete({
        pollId: poll.get("id"),
        userId,
        answerIndex
    });
})

module.exports = model("Poll", PollSchema);
