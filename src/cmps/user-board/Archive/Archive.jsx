import React from 'react';
import { connect } from 'react-redux';
import { GrClose } from 'react-icons/gr';
import { ArchivedGroupsList } from './ArchivedGroupsList';
import { ArchivedTasksList } from './ArchivedTasksList';

export class Archive extends React.Component {
  state = {
    archive: null,
    presenting: 'tasks',
  };

  componentDidMount() {
    this.setFilterIsArchive()
  }

  setFilterIsArchive = () =>{
    const { board } = this.props;
    let archiveToUpdate = { tasks: [], groups: [] };
    board.groups.forEach((group) =>
      group.tasks.forEach((task) => {
        if (task.isArchive) {
          archiveToUpdate.tasks.push(task);
        }
      })
    );
    archiveToUpdate.groups = board.groups.filter((group) => group.isArchive);
    this.setState({...this.state, archive: archiveToUpdate });
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.board !== this.props.board){
      this.setFilterIsArchive()
    }
  }

  setPresenting = () => {
    const presenting = this.state.presenting === 'tasks' ? 'groups' : 'tasks';
    this.setState({ presenting });
  };

  render() {
    const { openEditCard } = this.props;
    const board = this.props.board;
    const { archive, presenting } = this.state;
    if (!archive) return <span>Loading..</span>;
    const { tasks, groups } = archive;
    const switchTo = presenting === 'tasks' ? 'lists' : 'cards';
    return (
      <div>
        <div className={`archive-screen ${this.props.isArchiveShown}`} onClick={this.props.toggleIsArchiveOpen}></div>
      <section className={`archive ${this.props.isArchiveShown}`}>
        <header>
          <span>Archive</span>
          <GrClose className="close-archive" onClick={this.props.toggleIsArchiveOpen} />
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
          {Boolean(presenting === 'tasks' && tasks.length) && (
            <ArchivedTasksList
              tasks={tasks}
              board={board}
              openEditCard={openEditCard}
            />
          )}
          {Boolean(presenting === 'groups' && groups.length) && (
            <ArchivedGroupsList groups={groups} board={board} />
          )}
          {Boolean(
            (presenting === 'tasks' && !tasks.length) ||
              (presenting === 'groups' && !groups.length)
          ) && (
            <section className="empty-archive">
              No Archived {presenting === 'tasks' ? 'cards' : 'lists'}
            </section>
          )}
        </div>
      </section>
      </div>
    );
  }
}
