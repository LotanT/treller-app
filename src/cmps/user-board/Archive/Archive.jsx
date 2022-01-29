import React from "react";
import { connect } from "react-redux";
import { GrClose } from "react-icons/gr";
import { ArchivedGroupsList } from "./ArchivedGroupsList";
import { ArchivedTasksList } from "./ArchivedTasksList";

export class Archive extends React.Component {
  state = {
    archive: null,
    presenting: "tasks",
  };

  componentDidMount() {
    const { board } = this.props;
    // console.log("board from props", board);
    let archive = { tasks: [], groups: [] };
    board.groups.forEach((group) =>
      group.tasks.forEach((task) => {
        if (task.isArchived) {
          archive.tasks.push(task);
        }
      })
    );
    archive.groups = board.groups.filter((group) => group.isArchived);
    this.setState({ archive });
    // console.log("archive after mount", archive);
  }

  setPresenting = () => {
    const presenting = this.state.presenting === "tasks" ? "groups" : "tasks";
    this.setState({ presenting });
  };

  render() {
    const { openEditCard } = this.props;
    const board = this.props.board;
    const { archive, presenting } = this.state;
    if (!archive) return <span>Loading..</span>;
    const { tasks, groups } = archive;
    const switchTo = presenting === "tasks" ? "lists" : "cards";
    return (
      <section className="archive">
        <header>
          <span>Archive</span>
          <GrClose className="close-archive" />
        </header>
        <hr></hr>
        <div className="filter">
          <input
            className="search-archive"
            placeholder="Search archive..."
          ></input>
          <a className="grey-btn" onClick={this.setPresenting}>
            Switch to {switchTo}
          </a>
        </div>
        <div className="archive-content">
          {Boolean(presenting === "tasks" && tasks.length) && (
            <ArchivedTasksList
              tasks={tasks}
              board={board}
              openEditCard={openEditCard}
            />
          )}
          {Boolean(presenting === "groups" && groups.length) && (
            <ArchivedGroupsList groups={groups} board={board} />
          )}
          {Boolean(
            (presenting === "tasks" && !tasks.length) ||
              (presenting === "groups" && !groups.length)
          ) && (
            <section className="empty-archive">
              No Archived {presenting === "tasks" ? "cards" : "lists"}
            </section>
          )}
        </div>
      </section>
    );
  }
}
