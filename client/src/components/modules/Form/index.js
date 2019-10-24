import React from "react";
import _ from "lodash";

import { FlashMessageContext } from "../../context/FlashMessage";

import "./style.scss";

function Form({
    formShape,
    mutate,
    submitButtonLabel,
    onSubmitCreatorCallback,
    successMessage,
}) {
    const [formState, changeFormState] = React.useState(
        formShape ?
            formShape.map(data => ({
                ...data,
                value: data.defaultValue ? data.defaultValue : "",
            })) :
            []
    );
    const flashMessageContext = React.useContext(FlashMessageContext);

    function onSubmitCreator() {
        return async (event) => {
            event.preventDefault();

            try {
                const { data } = await mutate({
                    variables: formState.reduce((newVars, data) => (
                        { ...newVars, [_.camelCase(data.label)]: data.value }
                    ), {}),
                });
                await onSubmitCreatorCallback(data);

                if (successMessage)
                    flashMessageContext.showFlash(successMessage, 2);
                
            } catch (err) {
                flashMessageContext.showFlash(err.message, 1);
            }
        }
    }

    function onChangeCreator(inputIndex) {
        return (event) => {
            const newState = formState.map(data => ({ ...data }) );
            newState[inputIndex].value = event.target.value;
            changeFormState(newState)
        }
    }

    return (
        <form className="form" onSubmit={onSubmitCreator()}>
            {formState.map((data, i) => (
                <label key={i} className="form-group">
                    {data.label} <input
                        type={data.type}
                        value={data.value}
                        onChange={onChangeCreator(i)}
                    />
                </label>
            ))}
            <input type="submit" value={submitButtonLabel} />
        </form>
    )
}

export default Form;
