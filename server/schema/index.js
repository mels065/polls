const graphql = require("graphql");
const Joi = require("@hapi/joi");

const User = require("../models/user");
const Poll = require("../models/poll");
const Vote = require("../models/vote");

const authenticationHandler = require("./utils/authentication");
const registerHandler = require("./utils/register");
const loginHandler = require("./utils/login");

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLID,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList
} = graphql;

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: {
            type: GraphQLString,
            resolve: authenticationHandler((parent, args, context) =>  (
                context.user.id === parent.id ? parent.email : null
            )),
        },
        pollsCreated: {
            type: new GraphQLList(PollType),
            resolve(parent, args) {
                return Poll.find({ creatorId: parent.id });
            }

        },
        pollsVoted: {
            type: new GraphQLList(PollType),
            resolve: async (parent, args) => {
                const votes = await Vote.find({userId: parent.id});
                return Promise.all(votes.map(vote => Poll.findById(vote.pollId)));
            }
        }
    }),
});

const PollType = new GraphQLObjectType({
    name: "Poll",
    fields: () => ({
        id: { type: GraphQLID },
        creator: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.creatorId);
            }
        },
        question: { type: GraphQLString },
        answers: { 
            type: new GraphQLList(AnswerType),
            resolve(parent, args) {
                return parent.answers.map((answer, i) => ({
                    label: answer,
                    votes: Vote.find({ pollId: parent.id, answerIndex: i }),
                }));
            }
        }
    }),
});

const AnswerType = new GraphQLObjectType({
    name: "Answer",
    fields: () => ({
        label: { type: GraphQLString },
        votes: { type: new GraphQLList(VoteType) }
    })
});

const VoteType = new GraphQLObjectType({
    name: "Vote",
    fields: () => ({
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userId);
            }
        },
        poll: {
            type: PollType,
            resolve(parent, args) {
                return Poll.findById(parent.pollId);
            }
        }
    })
});

const ResponseType = new GraphQLObjectType({
    name: "Response",
    fields: () => ({
        success: { type: new GraphQLNonNull(GraphQLBoolean) },
        message: { type: GraphQLString },
        token: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return User.findById(args.id);
            }
        },
        currentUser: {
            type: UserType,
            resolve: authenticationHandler((parent, args, context) => context.user),
        },
        poll: {
            type: PollType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Poll.findById(args.id);
            }
        },
        polls: {
            type: new GraphQLList(PollType),
            resolve(parent, args) {
                return Poll.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        register: {
            type: ResponseType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                repeatPassword: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                return registerHandler(args);
            },
        },
        login: {
            type: ResponseType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                return loginHandler(args);
            }
        },
        deleteUser: {
            type: UserType,
            resolve: authenticationHandler(async (parent, args, context) => await context.user.remove())
        },
        createPoll: {
            type: PollType,
            args: {
                question: { type: new GraphQLNonNull(GraphQLString) },
                answers: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) }
            },
            resolve: authenticationHandler((parent, args, context) => {
                const poll = new Poll({
                    creatorId: context.user.id,
                    question: args.question,
                    answers: args.answers,
                });
                return poll.save();
            })
        },
        deletePoll: {
            type: PollType,
            args: {
                pollId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: authenticationHandler((parent, args, context) => (
                Poll.findOneAndDelete({ _id: args.pollId, creatorId: context.user.id })
            ))
        },
        castVote: {
            type: VoteType,
            args: {
                pollId: { type: new GraphQLNonNull(GraphQLID) },
                answerIndex: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: authenticationHandler(async (parent, args, context) => {
                const poll = await Poll.findById(args.pollId);
                return await poll.vote(context.user.id, args.answerIndex);
            })
        },
        castUnvote: {
            type: VoteType,
            args: {
                pollId: { type: new GraphQLNonNull(GraphQLID) },
                answerIndex: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: authenticationHandler(async (parent, args, context) =>  {
                const poll = await Poll.findById(args.pollId);
                return await poll.unvote(context.user.id, args.answerIndex)
            })
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
