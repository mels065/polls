import React from "react";
import { withRouter } from "react-router-dom";
import { useMutation, useQuery } from "react-apollo";

import Loading from "../Loading";
import Form from "../Form";

import { CurrentUserContext } from "../../context/CurrentUser";
import { FlashMessageContext } from "../../context/FlashMessage";

import { getCurrentUser } from "../../../graphql/queries";
import { updateUser, deleteUser } from "../../../graphql/mutations";

import "./style.scss";

function Profile({ history }) {
    const flashMessageContext = React.useContext(FlashMessageContext);
    const [updateUserMutate] = useMutation(updateUser);
    const [deleteUserMutate] = useMutation(deleteUser);

    const { data } = useQuery(getCurrentUser);
    
    function onSubmitUpdateUserCreatorCallback(data) {
        try {
            const { updateUser: {
                id
            } } = data;
            if (!id) {
                throw new Error("Something went wrong");
            }
        } catch(err) {
            throw err;
        }
    }

    async function onDeleteUser() {
        try {
            const { data } = await deleteUserMutate();
            const { deleteUser: { id } } = data;
            if (!id) throw new Error("Something went wrong");

            window.localStorage.setItem("token", "");
            history.push("/");
            flashMessageContext.showFlash("User has been deleted", 2);
        } catch (err) {
            throw err;
        }
    }

    return data && data.currentUser ?
        (
            <div className="profile">
                <Form
                    formShape={[
                        {
                            label: "Username",
                            type: "text",
                            defaultValue: data.currentUser.username
                        }
                    ]}
                    mutate={updateUserMutate}
                    submitButtonLabel="Update User"
                    onSubmitCreatorCallback={onSubmitUpdateUserCreatorCallback}
                    successMessage="User has been updated!"
                />
                <button
                    className="danger"
                    onClick={onDeleteUser}
                >
                    Delete User
                </button>
            </div>
        ) :
        (
            <Loading />
        );
}

export default withRouter(Profile);
