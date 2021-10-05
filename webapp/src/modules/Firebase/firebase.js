import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

import config from "./config.json";

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
    this.storage = app.storage();
  }

  // Authentication API
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  doSignOut = () => this.auth.signOut();

  activity = (uid) => this.db.ref(`activities/${uid}`);
  activities = () => this.db.ref("activities");
}

export default Firebase;
