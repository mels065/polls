import { CurrentPollProvider } from "./CurrentPoll";
import { CurrentPollListProvider } from "./CurrentPollList";
import { CurrentUserProvider } from "./CurrentUser";

export function MainProvider({ children }) {
    <CurrentUserProvider>
        <CurrentPollListProvider>
            <CurrentPollProvider>
                {children}
            </CurrentPollProvider>
        </CurrentPollListProvider>
    </CurrentUserProvider>
}
