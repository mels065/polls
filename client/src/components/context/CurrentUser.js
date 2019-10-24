import React from "react";

const value = {
    userId: null,
    username: "",
    email: "",
    registerUser() {}
};

export const CurrentUserContext = React.createContext(value);

export function CurrentUserProvider({ children }) {
    const [state, setState] = React.useState({
        userId: value.userId,
        username: value.username,
        email: value.email,
    });

    function registerUser(user) {
        setState({
            userId: user.id,
            username: user.username,
            email: user.email
        });
    }

    return (
        <CurrentUserContext.Provider value={{
            ...state,
            registerUser
        }}>
            {children}
        </CurrentUserContext.Provider>
    );
}
