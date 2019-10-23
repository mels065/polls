import React from 'react';
import { graphql } from "react-apollo";
import { Switch, Route, withRouter } from "react-router-dom";
import './style.scss';

import { CurrentUserContext } from "../context/CurrentUser";
import { getCurrentUser } from "../../graphql/queries";

import Layout from "../Layout";

import HomePage from "../pages/Home";
import RegisterPage from "../pages/Register";
import LoginPage from "../pages/Login"

function App({ data }) {
  const context = React.useContext(CurrentUserContext);
  const { currentUser } = data;

  if (currentUser) {
    context.registerUser(currentUser);
  }

  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/logout">
            Logout
          </Route>
          <Route exact path="/profile">
            Profile
          </Route>
          <Route exact path="/poll/:id">
            {(() => {
              function Poll({ match }) {
                return (
                  <div>Poll {match.params.id}</div>
                )
              }
              return withRouter(Poll);
            })()}
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default graphql(getCurrentUser)(App);
