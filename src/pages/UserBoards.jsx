import React from "react";
import { connect } from "react-redux";

import { loadBoards, onEditBoard } from "../store/board.actions";
import { BoardList } from "../cmps/user-boards/BoardList";
import { CreateNewBoard } from "../cmps/user-boards/CreateNewBoard";
import { TiStarOutline } from "react-icons/ti";
import { onLoginDefault } from "../store/user.actions";


class _UserBoards extends React.Component {

  componentDidMount() {
    this.props.loadBoards();
    this.logInDiffUser()
  }


  logInDiffUser = () => {
    if (!this.props.user) {
      this.props.onLoginDefault();
    }
  };

  render() {
    const { boards } = this.props;
    return (
      <div className="user-boards-container">
        <section className="user-boards-list">
          <div className="starred-boards">
            <section className="starred-boards-header">
              <TiStarOutline stroke="#42526e" />
              <h3>Starred boards</h3>
            </section>
            <div className="boards-list flex">
              <BoardList
                boards={boards.filter((board) => board.isStarred)}
                onEditBoard={this.props.onEditBoard}
              />
            </div>
          </div>
          <div className="my-boards">
            <div className="my-boards-header">
              <h3>My boards</h3>
            </div>
            <div className="boards-list flex">
              <BoardList
                boards={boards.filter((board) => !board.isStarred)}
                onEditBoard={this.props.onEditBoard}
              />
              <CreateNewBoard/>
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
    user: state.userModule.user,
  };
}

const mapDispatchToProps = {
  loadBoards,
  onEditBoard,
  onLoginDefault,
};
export const UserBoards = connect(
  mapStateToProps,
  mapDispatchToProps
)(_UserBoards);
