import React from "react";
import { withRouter } from "react-router-dom";
import { useMutation } from "react-apollo";

import Form from "../Form";

import { login } from "../../../graphql/mutations";

import "./style.scss";

function LoginForm({ history }) {
    const [mutate] = useMutation(login);

    function onSubmitCreatorCallback(data) {
        try {
            const { login: {
                success,
                message,
                token,
            } } = data;
            if (!success) {
                throw new Error(message);
            } else {
                window.localStorage.setItem("token", token);
                history.push("/");
            }
        } catch(err) {
            throw err;
        }
    }

    return (
        <React.Fragment>
            <h2>Login</h2>
            <Form
                formShape={
                    [
                        { type: "email", label: "Email" },
                        { type: "password", label: "Password" }
                    ]
                }
                mutate={mutate}
                submitButtonLabel="Login"
                onSubmitCreatorCallback={onSubmitCreatorCallback}
            />
        </React.Fragment>
    )
}

export default withRouter(LoginForm);