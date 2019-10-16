import { gql } from "apollo-boost";

export const getCurrentUser = gql`
    {
        currentUser {
            id
            username
            email
        }
    }
`;

export const getUser = gql`
    query($id: ID!) {
        user(id: $id)
    }
`;

export const getPolls = gql`
    {
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
                    id
                    username
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
                    id
                    username
                }
            }
        }
    }
`;


