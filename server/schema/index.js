const graphql = require("graphql");
const Joi = require("@hapi/joi");

const User = require("../models/user");
const Poll = require("../models/poll");
const Answer = require("../models/answer");

const authenticationHandler = require("./utils/authentication");
const registerHandler = require("./utils/register");
const loginHandler = require("./utils/login");

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLID,
    GraphQLBoolean,
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
            resolve(parent, args, context) {
                return authenticationHandler((parent, args, context) => {
                    return context.user.id === parent.id ? parent.email : null;
                });
            }
        },
        pollsCreated: {
            type: PollType,
            resolve(parent, args) {
                return Poll.find({ creatorId: parent.id });
            }

        },
        pollsVoted: {
            type: PollType,
            resolve(parent, args) {
                return Poll.find({ answers: { voters: { $in: [parent.id] } } });
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
                return Answer.find({ pollId: parent.id })
            }
        }
    }),
});

const AnswerType = new GraphQLObjectType({
    name: "Answer",
    fields: () => ({
        label: { type: GraphQLString },
        voters: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return parent.voters.map(id => User.findById(id));
            }
        }
    })
});

const ResponseType = new GraphQLObjectType({
    name: "Token",
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
        createPoll: {
            type: PollType,
            args: {
                creatorId: { type: new GraphQLNonNull(GraphQLID) },
                question: { type: new GraphQLNonNull(GraphQLString) },
                answers: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
            },
            resolve(parent, args) {
                let poll = new Poll({
                    creatorId: args.creatorId,
                    question: args.question,
                    answers: args.answers.map(label => ({ label, voters: [] })),
                });
                return poll.save();
            }
        },
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
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
