import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {GroupList} from '../cmps/user-board/GroupsList'
import { loadBoard, onEditBoard } from '../store/board.actions';
import {BoardHeader} from '../cmps/user-board/BoardHeader'
import {taskService} from '../services/task.service'


function _BoardDetails (props){
    // const [board, setBoard] = useState({board: null})
    // console.log(props)
    const {board} = props
    const boardId = props.match.params.boardId

    useEffect(()=>{
        props.loadBoard(boardId)
    }, [])
    
    const onAddGroup = () => {}
    const onAddTask = async (groupId,title) => {
        const updatedBoard = taskService.addTask(board,groupId,title)
        await props.onEditBoard(updatedBoard)
    }

    const onEditGroupTitle = async (groupId,title) => {
        const updatedBoard = taskService.editGroupTitle(board,groupId,title)
        await props.onEditBoard(updatedBoard)
    }
   
    // console.log(board)
    if(!board) return <span>loading...</span>
    return(
        <div className='board-container' style={{background:`url(${board.style.bgImg})`}}>
            <BoardHeader board={board}/>
            <div className="board-scroller"></div>
            <div className='board'>
            <GroupList groups={board.groups} boardId={boardId} onAddTask={onAddTask} onEditGroupTitle={onEditGroupTitle} />
            </div>
        </div>
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
