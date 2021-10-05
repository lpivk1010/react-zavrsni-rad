import React from "react";

import { Link } from "react-router-dom";
import * as ROUTES from "../../../assets/constants/routes";

import logo from "../assets/logo-white.png";
import { FooterIcons } from "../components";
import {
  SignOutButton,
  AuthUserContext,
} from "../../Authentication/components";

const FooterAuth = ({ isLoggedIn }) => (
  <div className="footer">
    <div>
      <img src={logo} alt="logo" className="footer-logo" />
    </div>
    <div className="footer-links-div">
      <ul className="footer-navlinks">
        <li>
          <Link to={ROUTES.HOME}>HOME</Link>
        </li>
        <li>
          <Link to={ROUTES.ACTIVITIES}>ACTIVITIES</Link>
        </li>
        {!isLoggedIn && (
          <li>
            <Link to={ROUTES.SIGN_IN}>SIGN IN</Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Link to={ROUTES.ADMIN}>ADMIN</Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <SignOutButton />
          </li>
        )}
      </ul>
    </div>
    <FooterIcons />
  </div>
);

const Footer = () => (
  <AuthUserContext.Consumer>
    {(authUser) => <FooterAuth isLoggedIn={authUser} />}
  </AuthUserContext.Consumer>
);

export default Footer;
