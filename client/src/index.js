import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router } from "react-router-dom";
import App from './components/App';

import MainProvider from "./components/context";

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
        <MainProvider>
            <Router forceRefresh={true}>
                <App />
            </Router>
        </MainProvider>
    </ApolloProvider>,
    document.getElementById('root')
);
