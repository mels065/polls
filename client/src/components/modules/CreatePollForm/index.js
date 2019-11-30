import React from "react";
import { useMutation } from "react-apollo";
import { useHistory } from "react-router-dom";

import CreateAnswerItem from "../CreateAnswerItem";

import { FlashMessageContext } from "../../context/FlashMessage"

import { createPoll } from "../../../graphql/mutations";

import "./style.scss";

function CreatePollForm() {
    const [formState, setFormState] = React.useState({
        question: "",
        answers: [""]
    });
    const flashMessageContext = React.useContext(FlashMessageContext);
    const [createPollMutation] = useMutation(createPoll);
    const history = useHistory();

    async function onSubmit(event) {
        event.preventDefault();

        try {
            await createPollMutation({
                variables: formState
            })
            history.push("/");   
        } catch (err) {
            flashMessageContext.showFlash(err.message);
        }
    }

    function onChangeCreator(key) {
        return (event) => {
            setFormState({
                ...formState,
                [key]: event.target.value
            });
        }
    }

    function onDeleteAnswerClickCreator(index) {
        return (event) => {
            event.preventDefault();

            setFormState({
                ...formState,
                answers: [
                    ...formState.answers.slice(0, index),
                    ...formState.answers.slice(index + 1)
                ]
            })
        }
    }

    function onChangeAnswerCreator(index) {
        return (event) => {
            setFormState({
                ...formState,
                answers: [
                    ...formState.answers.slice(0, index),
                    event.target.value,
                    ...formState.answers.slice(index + 1),
                ]
            });
        }
    }

    function addAnswer(event) {
        event.preventDefault();

        setFormState({
            ...formState,
            answers: [
                ...formState.answers,
                ""
            ]
        })
    }

    function generateCreateAnswerItems() {
        return formState.answers.map((answer, i) => (
            <li key={i}>
                <CreateAnswerItem
                    label={answer}
                    onChange={onChangeAnswerCreator(i)}
                    onDelete={onDeleteAnswerClickCreator(i)}
                />
            </li>
        ));
    }

    return (
        <React.Fragment>
            <h2>Create Poll</h2>
            <form className="create-poll-form" onSubmit={onSubmit}>
                <label>
                    Question <input value={formState.question} onChange={onChangeCreator("question")} />
                </label>
                <div className="create-answers">
                    <ol className="create-answers-list">
                        {generateCreateAnswerItems()}
                    </ol>
                    <button onClick={addAnswer}>New Answer</button>
                </div>
                <input type="submit" value="Create Poll" />
            </form>
        </React.Fragment>
    );
}

export default CreatePollForm;
