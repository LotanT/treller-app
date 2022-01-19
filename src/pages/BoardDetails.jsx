import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {GroupList} from '../cmps/GroupsList'
import { loadBoard } from '../store/board.actions';
// import {BoardHeader} fro



function _BoardDetails (props){
    // const [board, setBoard] = useState({board: null})
    console.log(props)
    useEffect(()=>{
        loadBoard()
    }, [])

    const onAddGroup = () => {}
    const {board} = props
    if(!board) return <span>loading...</span>
    return(
        <section className='board-container'>
            {/* <BoardHeader board={board}/> */}
            <section className='board'>
            <GroupList groups={board.groups}/>
            </section>
        </section>
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
