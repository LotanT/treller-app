import { Archive } from "../cmps/user-board/Archive/Archive";

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route } from "react-router";
import { userService } from "../services/user.service";
import { GroupList } from "../cmps/user-board/GroupsList";
import { socketService } from "../services/socket.service";
import { loadBoard, onEditBoard } from "../store/board.actions";
import { BoardHeader } from "../cmps/user-board/BoardHeader";
import { taskService } from "../services/task.service";
import { TaskEdit } from "../cmps/task-edit/TaskEdit";
import { onLoginDefault } from "../store/user.actions";


function _BoardDetails(props) {
  const [board, setBoard] = useState(null);
  const [isArchiveShown, setIsArchiveShown] = useState(false);
  const boardId = props.match.params.boardId;

  useEffect(() => {
    onLoadBoard(boardId);
    logInDiffUser()
    socketService.on("board-update", onLoadBoard);
  //   socketService.on('board-update', boardId => {
  //    props.loadBoard(boardId)
  // })
  }, []);

  useEffect(() => {
    setBoard(props.board);
  }, [props.board]);

  const onLoadBoard = async (boardId) => {
    await props.loadBoard(boardId);
    // setBoard(props.board);
  };

  const toggleIsArchiveOpen = () =>{
    setIsArchiveShown(!isArchiveShown)
  }

  const openEditCard = (boardId, task) => {
    props.history.push(`/${boardId}/${task.id}`);
  };

  const onAddGroup = (title) => {
    const updatedBoard = taskService.addGroup(board, title);
    props.onEditBoard(updatedBoard);
  };

  const onAddTask = (groupId, title) => {
    const updatedBoard = taskService.addTask(board, groupId, title);
    props.onEditBoard(updatedBoard);
  };

  const onEditGroupTitle = (groupId, title) => {
    const updatedBoard = taskService.editGroupTitle(board, groupId, title);
    props.onEditBoard(updatedBoard);
  };

  const onUpdateGroups = async (groups) => {
    const updatedBoard = taskService.updateGroups(board, groups);
    await props.onEditBoard(updatedBoard);
  };

  const toggleOpenLabel = (ev) => {
    if (!board.isLabelOpen) board.isLabelOpen = true;
    else board.isLabelOpen = !board.isLabelOpen;
    props.onEditBoard(board);
  };

  const onUpdateTask = (task) => {
    const updatedBoard = taskService.updateTask(board, task);
    props.onEditBoard(updatedBoard);
  };
  const onUpdateBoard = (board) => {
    props.onEditBoard(board);
  };

  const logInDiffUser = () => {
    if (!props.user) {
      props.onLoginDefault();
    }
  };
  if (!board) return <span>loading...</span>;
  // console.log(board)
  return (
    <div className='board-modal'>
      <div
        className="board-container"
        style={{ backgroundImage: `url(${board.style?.bgImg})` }}
      >
        <BoardHeader board={board} onUpdateBoard={onUpdateBoard} toggleIsArchiveOpen={toggleIsArchiveOpen} />
        <div className="board">
          <GroupList
            groupsFromBoard={board.groups}
            boardId={boardId}
            onAddTask={onAddTask}
            onEditGroupTitle={onEditGroupTitle}
            onUpdateGroups={onUpdateGroups}
            onAddGroup={onAddGroup}
            toggleOpenLabel={toggleOpenLabel}
            isLabelOpen={board.isLabelOpen}
            onUpdateTask={onUpdateTask}
          />
        </div>
      </div>
      <Archive board={board} openEditCard={openEditCard} isArchiveShown={isArchiveShown} toggleIsArchiveOpen={toggleIsArchiveOpen}/>
      <Route path="/:boardId/:taskId" component={TaskEdit} label="edit" />
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
  loadBoard,
  onEditBoard,
  onLoginDefault
};

export const BoardDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardDetails);
