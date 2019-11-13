import React from "react";
import { graphql, useQuery, useMutation } from "react-apollo";
import * as compose from "lodash.flowright";

import { castVote, castUnvote } from "../../../graphql/mutations";

import "./style.scss";

function AnswerListItem({ 
    pollId,
    answer: { label, votes },
    answerIndex,
    refetchQuery,
    currentUserData,
}) {
    const [castVoteMutation] = useMutation(castVote);
    const [castUnvoteMutation] = useMutation(castUnvote);

    function onClick() {
        if (currentUserData.currentUser) {
            if (votes.some(vote => currentUserData.currentUser.id === vote.user.id)) {
                castUnvoteMutation({
                    variables: {
                        pollId,
                        answerIndex
                    },
                    refetchQueries: [refetchQuery]
                })
            } else {
                castVoteMutation({
                    variables: {
                        pollId,
                        answerIndex
                    },
                    refetchQueries: [refetchQuery]
                });
            }
        }
    }

    return (
        window.localStorage.getItem("token") ?
            <button className="vote-button" onClick={onClick}>
                {label}
            </button> :
            <div>{label}</div>
    );
}

export default AnswerListItem;
