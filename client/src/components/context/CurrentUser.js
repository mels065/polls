import React from "react";

const value = {
    isLoading: false,
    userId: null,
    username: "",
    email: "",
    registerUser(user) {
        this.userId = user.userId;
        this.username = user.username;
        this.email = user.email;
    },
    unregisterUser() {
        this.userId = null;
        this.username = "";
        this.email = "";
    }
};

export const CurrentUserContext = React.createContext(value);

export function CurrentUserProvider({ children }) {
    return (
        <CurrentUserContext.Provider value={value}>
            {children}
        </CurrentUserContext.Provider>
    );
}
