import React from "react";

const value = {
    isLoading: false,
    polls: [],
    generatePolls(polls) {
        this.polls = polls;
    },
    clearPolls() {
        this.polls = [];
    }
};

export const CurrentPollListContext = React.createContext(value);

export function CurrentPollListProvider({ children }) {
    return (
        <CurrentPollListContext.Provider value={value}>
            {children}
        </CurrentPollListContext.Provider>
    );
}
