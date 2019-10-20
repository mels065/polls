import React from "react";
import { graphql } from "react-apollo";

import { getPolls } from "../../../graphql/queries";

import Loading from "../Loading";
import PollListItem from "../PollListItem";

import "./style.scss";

function PollList({ data }) {
    function fetchPolls() {
        const { polls } = data;
        console.log(data);
        if (!polls) {
            return <Loading />
        }
        if (polls.length === 0) {
            return "No polls yet"
        }
        return polls.map(poll => <li key={poll.id}><PollListItem poll={poll} /></li>)
    }

    return (
        <div className="poll-list">
            <ul>
                {fetchPolls()}
            </ul>
        </div>
    )
}

export default graphql(getPolls)(PollList);
