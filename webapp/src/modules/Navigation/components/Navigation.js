import React from "react";

import { Link } from "react-router-dom";
import * as ROUTES from "../../../assets/constants/routes";

import logo from "../assets/logo-white.png";

import { AuthUserContext } from "../../Authentication/components";

const NavigationAuth = ({ isLoggedIn }) => (
  <nav className="my-navbar">
    <Link to="/">
      <img src={logo} className="my-navbar-logo" alt="logo" />
    </Link>
    <ul className="my-navbar-ul">
      <li className="my-navbar-li">
        <Link to={ROUTES.HOME}>HOME</Link>
      </li>
      <li className="my-navbar-li">
        <Link to={ROUTES.ACTIVITIES}>ACTIVITIES</Link>
      </li>
      {isLoggedIn && (
        <li className="my-navbar-li">
          <Link to={ROUTES.ADMIN}>ADMIN</Link>
        </li>
      )}
    </ul>
  </nav>
);


const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
       {(authUser) => <NavigationAuth isLoggedIn={authUser} />}
    </AuthUserContext.Consumer>
  </div>
);

export default Navigation;

