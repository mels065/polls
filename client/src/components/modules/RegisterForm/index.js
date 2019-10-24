import React from "react";
import { withRouter } from "react-router-dom";
import { useMutation } from "react-apollo";

import Form from "../Form";

import { register } from "../../../graphql/mutations";

import "./style.scss";

function RegisterForm({ history }) {
    const [mutate] = useMutation(register);

    function onSubmitCreatorCallback(data) {
        try {
            const { register: {
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
            <h2>Register</h2>
            <Form
                formShape={
                    [
                        { type: "email", label: "Email" },
                        { type: "text", label: "Username" },
                        { type: "password", label: "Password" },
                        { type: "password", label: "Repeat Password" }
                    ]
                }
                mutate={mutate}
                submitButtonLabel="Register"
                onSubmitCreatorCallback={onSubmitCreatorCallback}
            />
        </React.Fragment>
    )
}

export default withRouter(RegisterForm);
