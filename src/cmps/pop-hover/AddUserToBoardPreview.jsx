import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { taskService } from "../../services/task.service";

import { MdDone } from "react-icons/md";

export function AddUserToBoardPreview({ user, board = null, onToggleUserToBoard }) {
  const [isOnBoard, setIsOnBoard] = useState(false);

  useEffect(() => {
    isUserOnBoard();
  }, [board]);

  const doOnToggleUserToBoard = () => {
    onToggleUserToBoard(user);
    isUserOnBoard();
  };

  const isUserOnBoard = () => {
    if (board) {
      if (board.members) {
        let bol = board.members.some((member) => member._id === user._id);
        setIsOnBoard(bol);
      }
    }
  };
  if (!user) return <></>
  return (
    <div className="user-task-container" onClick={doOnToggleUserToBoard}>
      {user ? (
        <img className="user-avatar" src={user.avatar} />
      ) : (
        <div className="user-profile"></div>
      )}
      <span className="full-name">{user.fullname}</span>
      {isOnBoard && <MdDone className="label-done" />}
    </div>
  );
}
