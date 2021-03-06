import { gql } from "apollo-boost";

export const getCurrentUser = gql`
    query {
        currentUser {
            id
            username
            email
        }
    }
`;

export const getUser = gql`
    query($id: ID!) {
        user(id: $id) {
            id
            username
        }
    }
`;

export const getPolls = gql`
    query {
        polls {
            id
            creator {
                id
                username
            }
            question
            answers {
                label
                votes {
                    user {
                        id
                        username
                    }
                }
            }
        }
    }
`;

export const getPoll = gql`
    query($id: ID!){
        poll(id: $id) {
            id
            creator {
                id
                username
            }
            question
            answers {
                label
                votes {
                    user {
                        id
                        username
                    }
                }
            }
        }
    }
`;


