import React from "react";
import { graphql } from "react-apollo";
import * as compose from "lodash.flowright";

import { getPolls } from "../../../graphql/queries";
import { castVote, castUnvote } from "../../../graphql/mutations";

import { CurrentUserContext } from "../../context/CurrentUser";

import "./style.scss";

function AnswerListItem({ 
    pollId,
    answer: { label, votes },
    answerIndex,
    castVote,
    castUnvote
}) {
    const currentUserContext = React.useContext(CurrentUserContext);

    function castVote() {
        if (votes.some(vote => vote.user.id === currentUserContext.user.id)) {
            castUnvote({
                variables: {
                    pollId,
                    answerIndex,
                },
                refetchQueries: [{ query: getPolls }] 
            });
        }
        else {
            castVote({
                variables: {
                    pollId,
                    answerIndex,
                },
                refetchQueries: [{ query: getPolls }] 
            });
        }
    }

    return (
        window.localStorage.getItem("token") || currentUserContext.userId ?
            <button className="vote-button" onClick={castVote}>
                {label}
            </button> :
            <div>{label}</div>
    );
}

export default compose(
    graphql(castVote, { name: "castVote" }),
    graphql(castUnvote, { name: "castUnvote" }),
)(AnswerListItem);
