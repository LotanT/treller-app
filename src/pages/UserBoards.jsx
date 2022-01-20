import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { boardService } from '../services/boards.service'
import { loadBoards } from '../store/board.actions'
import { BoardList } from '../cmps/user-boards/BoardList'

import starIcon from '../assets/imgs/user-boards/star.png'

class _UserBoards extends React.Component {


    componentDidMount() {
        loadBoards()
        console.log(this.props)

    }
    componentDidUpdate() {
        console.log(this.props)
    }

    render() {
        return (
            <section className="user-boards-list">
                <section className='starred-boards-header'>
                    <img src={starIcon} />
                    <h3>Starred boards</h3>
                        <BoardList/>
                </section>
                <div className="my-boards-header">
                    <img src={starIcon} />
                    <h3>My boards</h3>
                </div>

            </section>
        );
    }
}
function mapStateToProps(state) {
    return {
        boards: state.boardModule.boards
    }
}

const mapDispatchToProps = {
    loadBoards

}
export const UserBoards = connect(mapStateToProps, mapDispatchToProps)(_UserBoards)