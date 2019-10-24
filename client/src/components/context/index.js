import React from "react";

import { CurrentPollProvider } from "./CurrentPoll";
import { CurrentPollListProvider } from "./CurrentPollList";
import { CurrentUserProvider } from "./CurrentUser";
import { FlashMessageProvider } from "./FlashMessage";

export default function MainProvider({ children }) {
    return (
        <CurrentUserProvider>
            <FlashMessageProvider>
                <CurrentPollListProvider>
                    <CurrentPollProvider>
                        {children}
                    </CurrentPollProvider>
                </CurrentPollListProvider>
            </FlashMessageProvider>
        </CurrentUserProvider>
    );
}
