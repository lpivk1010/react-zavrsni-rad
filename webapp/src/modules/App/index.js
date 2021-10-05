import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "../../assets/constants/routes";

import Layout from "./layout";

import { HomePage } from "../Home";
import { ActivitesPage, SingleActivityPage } from "../Activities";
import { AdminPage } from "../Admin";
import { SignInPage, withAuthentication } from "../Authentication";

import { Firebase, FirebaseContext } from "../Firebase";

import "./app.css";
import "../Navigation/style/navigation.css";
import "../Navigation/style/footer.css";
import "../Authentication/style/signin.css";
import "../Home/style/home.css";
import "../Activities/style/activities.css";
import "../Activities/style/singleActivity.css";
import "../Admin/style/admin.css";

const AppBase = () => (
    <Router>
      <div>
        <Layout>
          <Switch>
            <Route exact path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACTIVITIES} component={ActivitesPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
            <Route path="/:url" component={SingleActivityPage} />
          </Switch>
        </Layout>
      </div>
    </Router>
);

const AppAuth = withAuthentication(AppBase);

const App = () => (
  <FirebaseContext.Provider value={new Firebase()}>
    <AppAuth />
  </FirebaseContext.Provider>
);

export default App;