import React from "react";
import { gql } from "apollo-boost";

import { CurrentPollListContext } from "../../context/CurrentPollList";

import "./style.scss";

function PollList({ data }) {
    const { polls } = data;
    React.useEffect(() => {

    }, [polls])
}
