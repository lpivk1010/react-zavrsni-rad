import React from "react";

import { FirebaseContext } from "../Firebase";

const withFirebase = (Component) => (props) => (
  <FirebaseContext.Consumer>
    {(firebase) => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default withFirebase;
