import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

import { useHistory } from "react-router-dom";
import { AddBoard } from "../pop-hover/AddBoard/AddBoard";

import MainLogo from "../../assets/imgs/header/user-header-still.gif";
import DownArrow from "../../assets/imgs/header/down-arrow.svg";
import { CreateNewBoard } from "../user-boards/CreateNewBoard";
// import { Link, NavLink } from 'react-router-dom'

function _AppHeaderUser(props) {
  const [isBoardsPage, setIsBoardsPage] = useState(
    window.location.hash === "#/userboards"
  );
  const history = useHistory();
  let modals = {
    isAddCheckList: false,
    isAddBoard: false,
    isAddMembers: false,
    isDueDatePop: false,
    isAddCover: false,
    isAttachment: false,
  };

  useEffect(() => {
    return history.listen((location) => {
      setIsBoardsPage(window.location.hash === "#/userboards");
    });
  }, [history]);

  const toggleModal = (popHover) => {
    const stateCopy = { ...modals };
    const nextValue = !stateCopy[popHover];
    Object.keys(stateCopy).forEach((key) => (stateCopy[key] = false));
    stateCopy[popHover] = nextValue;
    modals = { ...stateCopy };
  };

  return (
    <header className={`app-header-user ${isBoardsPage ? "user-boards" : ""}`}>
      <div className="header-content flex">
        <a href="#/" className="user-header-logo">
          <img src={MainLogo}></img>
        </a>
        <div className="nav-links ">
          <a className="nav-link-btn">Workspaces </a>
          <img className="arrow" src={DownArrow} />
        </div>

        <div className="nav-links ">
          <a className="nav-link-btn">Recent </a>
          <img className="arrow" src={DownArrow} />
        </div>

        <div className="nav-links ">
          <a className="nav-link-btn">Starred </a>
          <img className="arrow" src={DownArrow} />
        </div>

        <div className="nav-links ">
          <a className="nav-link-btn">Templates </a>
          <img className="arrow" src={DownArrow} />
        </div>
        <div className="nav-btn" onClick={() => toggleModal("isAddBoard")}>
          <a>Create</a>
        </div>
        {modals.isAddBoard && <CreateNewBoard />}

        <div className="user-container">
          {props.user ? (
            <img className="user-avatar" src={props.user.avatar} />
          ) : (
            <div className="user-profile"></div>
          )}
        </div>
      </div>
    </header>
  );
}

function mapStateToProps(state) {
  return {
    user: state.userModule.user,
  };
}
const mapDispatchToProps = {};

export const AppHeaderUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AppHeaderUser);
