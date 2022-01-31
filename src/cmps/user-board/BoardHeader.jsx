import { BsStar } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";
import { CgScreen } from "react-icons/cg";
import { BsFillPeopleFill } from "react-icons/bs";
import { BiFilter } from "react-icons/bi";
import { MdMoreHoriz } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { BsArchiveFill } from "react-icons/bs";
import { AddUserToBoard } from "../pop-hover/AddUserToBoard";
import { DashBoard } from "../../pages/DashBoard";

export function BoardHeader({
  board,
  onUpdateBoard,
  toggleIsArchiveOpen,
  toggleIsChangeBackgroundOpen,
}) {
  const [boardTitle, setBoardTitle] = useState(board.title);
  const [isEditBoardTitle, setIsEditBoardTitle] = useState(false);
  const [isUserOnBoard, setIsUserOnBoard] = useState(false);
  const [isDashBoard, setIsDashBoard] = useState(false);

  const updateBoardTitle = () => {
    toggleEditGroupTitle();
    board.title = boardTitle;
    onUpdateBoard(board);
  };

  const handleBaordChange = (ev) => {
    setBoardTitle(ev.target.value);
  };

  const toggleEditGroupTitle = () => {
    setIsEditBoardTitle(!isEditBoardTitle);
  };

  const toggleStarred = () => {
    board.isStarred = !board.isStarred;
    onUpdateBoard(board);
  };

  const toggleUserBoard = () => {
    setIsUserOnBoard(!isUserOnBoard);
  };
  const toggleDashBoard = () => {
    setIsDashBoard(!isDashBoard);
  };

  return (
    <div className="board-header">
      <div className="board-header-left">
        {!isEditBoardTitle && (
          <div className="board-name" onClick={toggleEditGroupTitle}>
            {board.title}
          </div>
        )}
        {isEditBoardTitle && (
          <input
            type="text"
            onBlur={updateBoardTitle}
            onChange={handleBaordChange}
            dir="auto"
            value={boardTitle}
            autoFocus
          ></input>
        )}
        <div className={`starred ${board.isStarred}`} onClick={toggleStarred}>
          {!board.isStarred && <BsStar />}
          {board.isStarred && <BsStarFill />}
        </div>
        <span className="board-header-divider"></span>
        <div className="members-container">
          {board.members && (
            <div className="board-members">
              {board.members.map((member, Idx) => {
                const z = board.members.length - Idx;
                return (
                  <div
                    key={member._id}
                    className="member"
                    style={{ zIndex: z }}
                  >
                    <img src={member.avatar} />
                  </div>
                );
              })}
            </div>
          )}
          <div className="card-composer-control board-header-invite-btn">
            <div className="cc-control-section">
              <span
                className="control-section-add-btn"
                onClick={toggleUserBoard}
              >
                <BsFillPeopleFill />
                Invite
              </span>
            </div>
          </div>
          {isUserOnBoard && (
            <AddUserToBoard toggleUserBoard={toggleUserBoard} />
          )}
        </div>
      </div>
      <div className="board-header-right">
        <div className="bg-cover btn" onClick={toggleIsChangeBackgroundOpen}>
          <span className="icon">
            <CgScreen />
          </span>
          <span>Choose cover</span>
        </div>
        <div className="show-menu btn" onClick={toggleDashBoard}>
          <span className="icon">
            <MdMoreHoriz />
          </span>
          <span>Dashboard</span>
        </div>
        <div className="show-menu btn" onClick={toggleIsArchiveOpen}>
          <span className="icon">
            <MdMoreHoriz />
          </span>
          <span>Archive</span>
        </div>
      </div>
      {isDashBoard && (
        <DashBoard toggleDashBoard={toggleDashBoard} board={board} />
      )}
    </div>
  );
}
