import React from "react";
import { Link } from "react-router-dom";

import AnswerListItem from "../AnswerListItem";

import { getPolls } from "../../../graphql/queries";

import "./style.scss";

function PollListItem({ poll: {
    id,
    question,
    creator
 } }) {
    return (
        <div className="poll-list-item">
            <Link to={`/poll/${id}`}>
                <h2 className="poll-list-item-question">
                    {question}
                </h2>
            </Link>
            <div className="poll-list-item-creator">
                created by <span className="creator-name">{creator.username}</span>
            </div>
        </div>
    )
 }

 export default PollListItem;
