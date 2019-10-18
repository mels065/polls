import React from "react";
import { Route, Redirect } from "react-router-dom";

import { CurrentUserContext } from "./context/CurrentUser";

function ProtectedRoute({exact, path, redirect, children }) {
    const currentUser = React.useContext(CurrentUserContext);
    return (
        <Route exact={exact} path={path}>
            {
                currentUser.userId ?
                    (
                        {children}
                    ) :
                    (
                        <Redirect to={redirect} />
                    )
            }
        </Route>
    )
}

export default ProtectedRoute;
