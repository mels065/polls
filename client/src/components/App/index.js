import React from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import './style.scss';

import { CurrentUserContext } from "../context/CurrentUser";
import { getCurrentUser } from "../../graphql/queries";

import Layout from "../Layout";

import FlashMessage from "../modules/FlashMessage";

import HomePage from "../pages/Home";
import RegisterPage from "../pages/Register";
import LoginPage from "../pages/Login"
import ProfilePage from "../pages/Profile";
import CreatePollPage from "../pages/CreatePoll";
import PollPage from "../pages/Poll";
import Logout from "../pages/Logout";

function App() {
  return (
    <div className="App">
      <FlashMessage />
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
            <Logout />
          </Route>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/create-poll">
            <CreatePollPage />
          </Route>
          <Route exact path="/poll/:id">
            <PollPage />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
