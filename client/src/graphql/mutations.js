import { gql } from "apollo-boost";

export const register = gql`
    mutation($email: String!, $username: String!, $password: String!, $repeatPassword: String!) {
        register(email: $email, username: $username, password: $password, repeatPassword: $repeatPassword) {
            success
            message
            token
        }
    }
`;

export const login = gql`
    mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            success
            message
            token
        }
    }
`;

export const deleteUser = gql`
    mutation {
        deleteUser {
            id
            username
        }
    }
`;

export const createPoll = gql`
    mutation($question: String!, $answers: [String!]!) {
        createPoll(question: $question, answers: $answers) {
            id
            creator {
                id
                username
            }
            question
            answers {
                label
                votes {
                    id
                    username
                }
            }
        }
    }
`;

export const deletePoll = gql`
    mutation($pollId: ID) {
        deletePoll(pollId: $pollId) {
            id
            creator {
                id
                username
            }
            question
            answers {
                label
                votes {
                    id
                    username
                }
            }
        }
    }
`;

export const castVote = gql`
    mutation($pollId: ID!, $answerIndex: Int!) {
        castVote(pollId: $pollId, answerIndex: $answerIndex) {
            user {
                id
                username
            }
            poll {
                id
                question
            }
        }
    }
`;

export const castUnvote = gql`
    mutation($pollId: ID!, $answerIndex: Int!) {
        castUnvote(pollId: $pollId, answerIndex: $answerIndex) {
            user {
                id
                username
            }
            poll {
                id
                question
            }
        }
    }
`;
