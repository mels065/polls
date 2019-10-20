import React from "react";
import { gql } from "react-apollo";

import { getCurrentUser } from "../../graphql/queries";

const value = {
    isLoading: false,
    userId: null,
    username: "",
    email: "",
    registerUser() {},
    unregisterUser() {}
};

export const CurrentUserContext = React.createContext(value);

export function CurrentUserProvider({ children }) {
    const [user, changeUser] = React.useState({
        userId: null,
        username: "",
        email: ""
    });

    function registerUser(user) {
        if (user.userId && user.username && user.email) {
            changeUser(user);
        }
    }

    function unregisterUser() {
        changeUser({
            userId: null,
            username: "",
            email: "",
        })
    }

    return (
        <CurrentUserContext.Provider value={{
            ...user,
            toggleLoading,
            registerUser,
            unregisterUser,
        }}>
            {children}
        </CurrentUserContext.Provider>
    );
}
