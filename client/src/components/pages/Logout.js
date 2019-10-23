import React from "react";
import { withRouter } from "react-router-dom";

function Logout({ history }) {
    window.localStorage.removeItem("token");
    history.push("/");

    return (
        <div />
    );
}

export default withRouter(Logout);
