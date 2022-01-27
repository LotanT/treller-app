import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { boardService } from '../services/boards.service'
import { loadBoards, onEditBoard } from '../store/board.actions'
import { BoardList } from '../cmps/user-boards/BoardList'
import { CreateNewBoard } from '../cmps/user-boards/CreateNewBoard'
import { onLoginDefault } from "../store/user.actions";


import starIcon from '../assets/imgs/user-boards/star.png'
import { AddBoard } from '../cmps/pop-hover/AddBoard'

class _UserBoards extends React.Component {
    8
    state = {
        isOpenModal: false
    }


    componentDidMount() {
        this.props.loadBoards()
        this.logInDiffUser()
    }

    openModal = () => {
        this.setState({ isOpenModal: true })
    }
    closeModal = () => {

        this.setState({ isOpenModal: false })
    }

    logInDiffUser = () => {
        if (!this.props.user) {
            this.props.onLoginDefault()
        }
    }


    render() {
        const { boards } = this.props
        const { isOpenModal } = this.state
        return (
            <div className="user-boards-container">
                <section className="user-boards-list">
                    <section className='starred-boards-header'>
                        <img src={starIcon} />
                        <h3>Starred boards</h3>
                        <div className="boards-list flex">
                            <BoardList boards={boards.filter((board) => board.isStarred)} onEditBoard={this.props.onEditBoard} />
                        </div>
                    </section>
                    <div className="my-boards-header">
                        <h3>My boards</h3>
                        <div className="boards-list flex">

                            <BoardList boards={boards.filter((board) => !board.isStarred)} onEditBoard={this.props.onEditBoard} />
                            <CreateNewBoard closeModal={this.closeModal} isOpenModal={isOpenModal} openModal={this.openModal} />
                            {/* <AddBoard closeModal={this.closeModal} isOpenModal={isOpenModal}/> */}
                        </div>
                    </div>

                </section>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        boards: state.boardModule.boards,
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    loadBoards,
    onEditBoard,
    onLoginDefault

}
export const UserBoards = connect(mapStateToProps, mapDispatchToProps)(_UserBoards)