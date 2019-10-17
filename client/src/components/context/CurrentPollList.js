import React from "react";

const value = {
    isLoading: false,
    polls: []
};

export const CurrentPollListContext = React.createContext(value);

export function CurrentPollListProvider({ children }) {
    return (
        <CurrentPollListContext.Provider>
            {children}
        </CurrentPollListContext.Provider>
    );
}
