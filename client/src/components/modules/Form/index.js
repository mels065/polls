import React from "react";

import "./style.scss";

function Form({ error, formShape, submitButtonLabel, onSubmitCreator }) {
    const [formState, changeFormState] = React.useState(
        formShape.map(data => ({
            ...data,
            value: data.defaultValue ? data.defaultValue : "",
        }))
    );

    function onChangeCreator(inputIndex) {
        return (event) => {
            const newState = formState.map(data => ({ ...data }) );
            newState[inputIndex].value = event.target.value;
            changeFormState(newState)
        }
    }

    return (
        <form className="form" onSubmit={onSubmitCreator(formState)}>
            <div className="form-error">{error}</div>
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
