import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import MainLogo from "../../assets/imgs/header/main-logo.png";

import { Link, NavLink } from "react-router-dom";

function _AppHeaderMain() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <header className="app-header">
      <div className="header-content flex space-between">
        <div className="header-logo">
          <img src={MainLogo}></img>
        </div>

        {!isLogin && (
          <NavLink className="login" to="/loginPage">
            <button className="btn login-btn">Log in</button>
            <button className="btn sign-up-btn">Sign up</button>
          </NavLink>
        )}
      </div>
    </header>
  );
}

function mapStateToProps(state) {
  return {};
}
const mapDispatchToProps = {};

export const AppHeaderMain = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AppHeaderMain);
