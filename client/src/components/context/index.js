import React from "react";

import { CurrentPollProvider } from "./CurrentPoll";
import { CurrentPollListProvider } from "./CurrentPollList";
import { CurrentUserProvider } from "./CurrentUser";

export default function MainProvider({ children }) {
    return (
        <CurrentUserProvider>
            <CurrentPollListProvider>
                <CurrentPollProvider>
                    {children}
                </CurrentPollProvider>
            </CurrentPollListProvider>
        </CurrentUserProvider>
    );
}
