import React from "react";

import logo from "../assets/logo.png";

import { SignInForm } from "../components";

const SignInPage = () => (
  <div className="signin-page">
    <div className="signin-box">
      <img src={logo} className="signin-logo" alt="logo" />
      <SignInForm />
    </div>
  </div>
);

export default SignInPage;
