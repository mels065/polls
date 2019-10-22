import React from "react";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import { useMutation } from "react-apollo";

import Form from "../Form";

import { register } from "../../../graphql/mutations";
import { getCurrentUser } from "../../../graphql/queries";

import "./style.scss";

function RegisterForm({ history }) {
    const [error, setError] = React.useState(null);
    const [mutate] = useMutation(register);

    function onSubmitCreator(formState) {
        return async (event) => {
            event.preventDefault();

            try {
                const { data } = await mutate({
                    variables: formState.reduce((newVars, data) => (
                        { ...newVars, [_.camelCase(data.label)]: data.value }
                    ), {}),
                });
                const { register: {
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
                console.log(err);
                setError(err.message);
            }
        }
    }

    return (
        <React.Fragment>
            <h2>Register</h2>
            <Form
                error={error}
                formShape={
                    [
                        { type: "email", label: "Email" },
                        { type: "text", label: "Username" },
                        { type: "password", label: "Password" },
                        { type: "password", label: "Repeat Password" }
                    ]
                }
                submitButtonLabel="Register"
                onSubmitCreator={onSubmitCreator}
            />
        </React.Fragment>
    )
}

export default withRouter(RegisterForm);
