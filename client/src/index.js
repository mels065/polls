import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import './index.css';
import App from './App';

const client = new ApolloClient({
    uri: "/graphql",
    request: (operation) => {
        const token = localStorage.getItem("token");
        operation.setContext({
            headers: {
                ["auth-token"]: token
            }
        });
    }
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);
