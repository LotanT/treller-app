import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { taskService } from '../../services/task.service'
import { userService } from '../../services/user.service'
import {  onEditBoard } from '../../store/board.actions'
import { AddUserToTaskPreview } from './AddUserToTaskPreview'

import { MdArrowBackIos } from "react-icons/md";
import { BiPencil } from "react-icons/bi";
import { GrClose } from "react-icons/gr";

//MAP TO BOARD PREV

function _AddUserToTask(props) {
  const [task, setTask] = useState(
    taskService.getTaskById(props.board, props.taskId)
  );
  const [UserAttached, setUserAttached] = useState([]);

  useEffect(() => {
    setTaskLocal();
    setUsers();
  }, [props.board]);

  const setTaskLocal = () => {
    setTask(taskService.getTaskById(props.board, props.taskId));
  };

  const setUsers = async () => {
    if (props.board.members.length > 0) {
      setUserAttached(props.board.members);
    } else {
      setUserAttached(await userService.getUsers());
    }
  };

  const onToggleUserToTask = async (user) => {
    let updatedBoard = taskService.toggleUserToTask(
      props.board,
      props.taskId,
      user
    );
    await props.onEditBoard(updatedBoard);
    setTaskLocal();
  };

  const top = props.top? props.top: '134px';
  const left = props.left? props.left: '540px';

  return (
    <div className="add-labels-pop" style={{top: top,left: left}}>
      <div className="pop-content">
        <div className="header-container">
          <GrClose
            stroke="#0079bf"
            fill="#0079bf"
            className="exit-svg"
            onClick={props.toggleModal}
          />
          <div className="add-labels-title">Members</div>
        </div>

        <div className="add-label-preview">
          <div className="add-title">Board members</div>
          {UserAttached.length > 0 &&
            UserAttached.map((user) => (
              <div key={user._id} className="label-container-pencil">
                <AddUserToTaskPreview
                  user={user}
                  task={task}
                  onToggleUserToTask={onToggleUserToTask}
                />
                {/* <BiPencil className='pencil-icon' onClick={() => moveToEditLabel(user)} /> */}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
    user: state.userModule.user,
  };
}
const mapDispatchToProps = {
  onEditBoard,
};

export const AddUserToTask = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AddUserToTask);
