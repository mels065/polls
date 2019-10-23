import React from "react";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import { useMutation } from "react-apollo";

import Form from "../Form";

import { login } from "../../../graphql/mutations";

import "./style.scss";

function LoginForm({ history }) {
    const [error, setError] = React.useState(null);
    const [mutate] = useMutation(login);

    function onSubmitCreator(formState) {
        return async (event) => {
            event.preventDefault();

            try {
                const { data } = await mutate({
                    variables: formState.reduce((newVars, data) => (
                        { ...newVars, [_.camelCase(data.label)]: data.value }
                    ), {}),
                });
                const { login: {
                    success,
                    message,
                    token,
                } } = data;
                if (!success) {
                    setError(message);
                } else {
                    setError(null);
                    window.localStorage.setItem("token", token);
                    history.push("/");
                }
            } catch(err) {
                setError(err.message);
            }
        }
    }

    return (
        <React.Fragment>
            <h2>Login</h2>
            <Form
                error={error}
                formShape={
                    [
                        { type: "email", label: "Email" },
                        { type: "password", label: "Password" }
                    ]
                }
                submitButtonLabel="Login"
                onSubmitCreator={onSubmitCreator}
            />
        </React.Fragment>
    )
}

export default withRouter(LoginForm);