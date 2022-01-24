import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route } from "react-router";


import { GroupList } from '../cmps/user-board/GroupsList'
import { loadBoard, onEditBoard } from '../store/board.actions';
import { BoardHeader } from '../cmps/user-board/BoardHeader'
import { taskService } from '../services/task.service'
import { TaskEdit } from '../cmps/task-edit/TaskEdit';


function _BoardDetails(props) {
    // const [board, setBoard] = useState({board: null})
    // console.log(props)
    const { board } = props
    const boardId = props.match.params.boardId

    useEffect(() => {
        props.loadBoard(boardId)
    }, [])

    const onAddGroup = (title) => { 
        const updatedBoard = taskService.addGroup(board, title)
        props.onEditBoard(updatedBoard)
    }

    const onAddTask = async (groupId, title) => {
        const updatedBoard = taskService.addTask(board, groupId, title)
        props.onEditBoard(updatedBoard)
    }

    const onEditGroupTitle = async (groupId,title) => {
        const updatedBoard = taskService.editGroupTitle(board,groupId,title)
        props.onEditBoard(updatedBoard)
    }
    
    const onUpdateGroups = (groups) =>{
        const updatedBoard = taskService.updateGroups(board, groups)
        props.onEditBoard(updatedBoard)
    }
   
    // console.log(board)
    if(!board) return <span>loading...</span>
    return(
        <>
        <div className='board-container' style={{background:`url(${board.style.bgImg})`}}>
            <BoardHeader board={board}/>
            <div className="board-scroller"></div>
            <div className='board'>
            <GroupList groups={board.groups} boardId={boardId} onAddTask={onAddTask} onEditGroupTitle={onEditGroupTitle} onAddGroup={onAddGroup} onUpdateGroups={onUpdateGroups} />
            </div>
            </div>
            <Route
                path="/:boardId/:taskId"
                component={TaskEdit}
                label="edit"
            />
        </>
    )
}


function mapStateToProps(state) {
    return {
        board: state.boardModule.board
    }
}
const mapDispatchToProps = {
    loadBoard,
    onEditBoard
}


export const BoardDetails = connect(mapStateToProps, mapDispatchToProps)(_BoardDetails)
