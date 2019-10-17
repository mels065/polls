import React from "react";

const value = {
    isLoading: false,
    userId: null,
    username: null,
    email: null
};

export const CurrenUserContext = React.createContext(value);

export function CurrentUserProvider({ children }) {
    return (
        <CurrentUserContext.Provider value={value}>
            {children}
        </CurrentUserContext.Provider>
    );
}
