import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "react-apollo";
import { Pie } from "react-chartjs-2";
import randomColor from "randomcolor";

import {
    getPoll,
    getCurrentUser
} from "../../../graphql/queries";
import {
    deletePoll,
} from "../../../graphql/mutations";

import { FlashMessageContext } from "../../context/FlashMessage";

import AnswerListItem from "../AnswerListItem";
import Loading from "../Loading";

import "./style.scss";

function Poll() {
    const flashMessageContext = React.useContext(FlashMessageContext);
    const { id } = useParams();
    const history = useHistory();
    const pollData = useQuery(getPoll, {
        variables: { id }
    }).data
    const currentUserData = useQuery(getCurrentUser).data;
    const [deletePollMutation] = useMutation(deletePoll);

    async function onDeleteButtonClick() {
        try {
            await deletePollMutation({
                variables: { pollId: id }
            });
            history.push("/");
        } catch (err) {
            flashMessageContext.showFlash(err.message);
        }
    }

    if (pollData && currentUserData) {
        const { poll } = pollData;
        const { currentUser } = currentUserData;
        const pieChartData = {
            labels: poll.answers.map(({ label }) => label),
            datasets: [{
                data: poll.answers.map(({ votes }) => votes.length),
                backgroundColor: randomColor({ count: poll.answers.length })
            }]
        };
        return (
            <div className="poll">
                {
                    currentUser && poll.creator.id === currentUser.id ?
                        <button onClick={onDeleteButtonClick}>Delete</button> :
                        null
                }
                <h2>{poll.question}</h2>
                <ul className="poll-answers">
                    {poll.answers.map((answer, i) => (
                    <li key={i}>
                        <AnswerListItem
                            currentUserData={currentUserData}
                            pollId={id}
                            answer={answer}
                            answerIndex={i}
                            refetchQuery={{
                                query: getPoll,
                                variables: { id }
                            }}
                        />
                    </li>
                ))}
                </ul>
                <Pie data={pieChartData} />
                <div className="poll-creator">
                    created by <span className="creator-name">{poll.creator.username}</span>
                </div>
            </div>
        )
    } else {
        return <Loading />
    }
}

export default Poll;
