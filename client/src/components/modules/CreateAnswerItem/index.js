import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import "./style.scss";

function CreateAnswerItem({ label, onChange, onDelete }) {
    return (
        <React.Fragment>
            <input className="create-answer-item" value={label} onChange={onChange} />
            <button onClick={onDelete}><FontAwesomeIcon icon={faTimes} /></button>
        </React.Fragment>
    );
}

export default CreateAnswerItem;
