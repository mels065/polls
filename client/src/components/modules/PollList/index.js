import React from "react";
import { graphql, useQuery } from "react-apollo";

import { getPolls } from "../../../graphql/queries";

import Loading from "../Loading";
import PollListItem from "../PollListItem";

import { getCurrentUser } from "../../../graphql/queries";

import "./style.scss";

function PollList({ data }) {
    const currentUser = useQuery(getCurrentUser).data;
    function fetchPolls() {
        const { polls } = data;
        if (!polls) {
            return <Loading />
        }
        if (polls.length === 0) {
            return "No polls yet"
        }
        return polls.map(poll => (
            <li key={poll.id}>
                <PollListItem poll={poll} currentUser={currentUser} />
            </li>
        ))
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
