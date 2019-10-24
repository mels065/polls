import React from "react";

const value = {
    show: false,
    message: "",
    type: 0,
    showFlash() {}
}

export const FlashMessageContext = React.createContext(value);

export function FlashMessageProvider({ children }) {
    const [state, setState] = React.useState({
        show: value.false,
        message: value.message,
        type: value.type
    });

    function showFlash(message, type) {
        setState({
            show: true,
            message,
            type
        });

        setTimeout(() => {
            setState({
                show: false,
                message: "",
                type: 0
            })
        }, 3000);
    }

    return (
        <FlashMessageContext.Provider value={{
            ...state,
            showFlash,
        }}>
            {children}
        </FlashMessageContext.Provider>
    );
}
