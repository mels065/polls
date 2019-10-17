import React from "react";

const value = {
    isLoading: false,
    id: null,
    question: null,
    answers: []
};

export const CurrentPollContext = React.createContext(value);

export function CurrentPollProvider({ children }) {
    return (
        <CurrentPollContext.Provider value={value}>
            {children}
        </CurrentPollContext.Provider>
    );
}
