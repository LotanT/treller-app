import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {GroupList} from '../cmps/GroupsList'
import { loadBoard } from '../store/board.actions';
import {BoardHeader} from '../cmps/BoardHeader'



function _BoardDetails (props){
    // const [board, setBoard] = useState({board: null})
    console.log(props)
    useEffect(()=>{
        // console.log(this.props);

        props.loadBoard(props.match.params.boardId)
    }, [])
    
    const onAddGroup = () => {}
    const {board} = props
    console.log(board)
    if(!board) return <span>loading...</span>
    return(
        <div className='board-container'>
            <BoardHeader board={board}/>
            <div className="board-scroller"></div>
            <div className='board'>
            <GroupList groups={board.groups}/>
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
    loadBoard
}


export const BoardDetails = connect(mapStateToProps, mapDispatchToProps)(_BoardDetails)
