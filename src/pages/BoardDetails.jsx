import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import {userService} from '../services/user.service'
import { GroupList } from '../cmps/user-board/GroupsList';
import { socketService } from '../services/socket.service';
import { loadBoard, onEditBoard } from '../store/board.actions';
import { BoardHeader } from '../cmps/user-board/BoardHeader';
import { taskService } from '../services/task.service';
import { TaskEdit } from '../cmps/task-edit/TaskEdit';

function _BoardDetails(props) {
  const [board, setBoard] = useState(null);
  const boardId = props.match.params.boardId;

  useEffect(() => {    
    onLoadBoard(boardId)
    socketService.on('board-update', onLoadBoard)
    
  },[]);

  useEffect(()=>{
    setBoard(props.board)
  },[props.board])

const setMembers = () =>{
  if(!board) return
  if(board.members.length === 0)
    board.members = [
      {
        "_id" : "61f2c40f9faf574c74ecac86",
        "username" : "guest",
        "password" : "$2b$10$TuPrlRV/W8RbpxNo/izEQuItV0dEsSUZc/3xh7UD52.kOEZXvX7yC",
        "fullname" : "Mr Guest",
        "avatar" : "https://ui-avatars.com/api/?name=Mr Guest&&rounded=true"
    },
    {
      "_id" : "61f2c82726578e5690f31ba5",
      "username" : "Ofek",
      "password" : "$2b$10$zmyRnToR3hikn/ZGUNhrLug1MPvbuZo8DDKwCyoEkf.yOrhAaCHLG",
      "fullname" : "Ofek Ben Baruch",
      "avatar" : "https://i.kinja-img.com/gawker-media/image/upload/t_original/ijsi5fzb1nbkbhxa2gc1.png"
  },
  {
    "_id" : "61f2cf1126578e5690f31ba6",
    "username" : "Ofek and Din",
    "password" : "$2b$10$go4CGaQoMQbQFa7fEjWegOIg7jZfz0hqPy.BOIBJu1hOK8zbcN3Li",
    "fullname" : "Ofek and Din Bnd",
    "avatar" : "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"
  }
]
  }


  const onLoadBoard = async (boardId) => {
    await props.loadBoard(boardId);
    // setBoard(props.board);
  }

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
  }
  const onUpdateBoard = (board) =>{
    props.onEditBoard(board);
  }
  // if(!board) onLoadBoard(boardId);
  if (!board) return <span>loading...</span>
  setMembers()
  console.log(board)
  return (
    <>
      <div
        className="board-container"
        style={{ backgroundImage: `url(${board.style?.bgImg})` }}
        // style={{ background: `url(${board.style?.bgImg})` }}
      >
        <BoardHeader board={board} onUpdateBoard={onUpdateBoard} />
        {/* <div className="board-scroller"></div> */}
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
      <Route path="/:boardId/:taskId" component={TaskEdit} label="edit" />
    </>
  );
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
  };
}
const mapDispatchToProps = {
  loadBoard,
  onEditBoard,
};

export const BoardDetails = connect(mapStateToProps,mapDispatchToProps)(_BoardDetails);
