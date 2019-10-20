import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./style.scss";

function MenuItem({ icon, to, children }) {
    return (
        <Link to={to}>
            {icon ?
                (
                   <React.Fragment>
                       <FontAwesomeIcon icon={icon} />&nbsp;
                   </React.Fragment> 
                ) : 
                null}
                {children}
        </Link>
    )
}

export default MenuItem;