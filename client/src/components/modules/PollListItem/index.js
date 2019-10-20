import React from "react";

import AnswerListItem from "../AnswerListItem";

import "./style.scss";

function PollListItem({ poll: {
    id,
    question,
    answers,
    creator
 } }) {
    return (
        <div className="poll-list-item">
            <div className="poll-list-item-question">
                {question}
            </div>
            <ul className="poll-list-item-answers">
                {answers.map((answer, i) => (
                <li key={i}>
                    <AnswerListItem
                        pollId={id}
                        answer={answer}
                        answerIndex={i}
                    />
                </li>
            ))}
            </ul>
            <div className="poll-list-item-creator">
                created by <span className="creator-name">{creator.username}</span>
            </div>
        </div>
    )
 }

 export default PollListItem;
