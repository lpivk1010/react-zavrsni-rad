import React from 'react';
 
import { withFirebase } from '../../Firebase';
 
const SignOutButtonBase = ({ firebase }) => (
  <button className="signout-button" type="button" onClick={firebase.doSignOut}>
    SIGN OUT
  </button>
);

const SignOutButton = withFirebase(SignOutButtonBase);
export default SignOutButton;