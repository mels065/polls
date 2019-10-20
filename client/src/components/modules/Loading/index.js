import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import "./style.scss";

function Loading() {
    return (
        <div className="loading">
            Loading... <FontAwesomeIcon icon={faSpinner} spin />
        </div>
    );
}

export default Loading;
