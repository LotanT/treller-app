import React from "react";
import { connect } from "react-redux";
import { onEditBoard } from "../../../store/board.actions";
import { taskService } from "../../../services/task.service";

import { AiOutlineClockCircle } from "react-icons/ai";
import { CgDetailsMore } from "react-icons/cg";
import { BiMessageRounded } from "react-icons/bi";
import { BsCheck2Square } from "react-icons/bs";
import { MdAttachFile } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

class _ArchivedTaskPreview extends React.Component {
  state = {
    task: null,
  };

  componentDidMount() {
    const { task } = this.props;
    this.setState({ task });
    // console.log(task);
  }

  getDateTemplate = (task) => {
    const month_names_short = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const duDate = new Date(task.dueDate);
    const now = new Date();
    let date = `${month_names_short[duDate.getMonth()]} ${duDate.getDate()}`;
    if (now.getMonth() === duDate.getMonth()) {
      if (now.getDate() === duDate.getDate()) date = "Today";
      else if (now.getDate() === duDate.getDate() - 1) date = "Tommorow";
      else if (now.getDate() === duDate.getDate() + 1) date = "Yesterday";
    }
    return `${date} at ${duDate.getHours()}:${duDate.getMinutes()}`;
  };

  getCheckListCount = () => {
    let checkIsListDone;
    const { task } = this.state;
    let checkListCount = task.checklists.map(
      (checklist) => checklist.todos.length
    );
    checkListCount = checkListCount.reduce((a, b) => a + b, 0);
    let checkListDone = task.checklists.map(
      (checklist) => checklist.todos.filter((todo) => todo.isDone).length
    );
    checkListDone = checkListDone.reduce((a, b) => a + b, 0);
    if (checkListDone === checkListCount) checkIsListDone = "complete";
    return `${checkListDone}/${checkListCount}`;
  };

  toggleTaskDone = () => {
    let { task } = this.state;
    task.isDone = !task.isDone;
    this.onUpdateTask(task);
  };

  onOpenEditCard = () => {
    const { boardId } = this.props;
    const { task } = this.state;
    this.props.openEditCard(boardId, task);
  };

  toggleArchive = () => {
    let task = taskService.getTaskById(this.props.board, this.props.task.id);
    task.isArchive = !task.isArchive;
    const updatedBoard = taskService.updateTask(this.props.board, task);
    this.props.onEditBoard(updatedBoard);
  };

  render() {
    const { task } = this.state;
    if (!task) return <span>Loading..</span>;
    let isColor;
    if (task.style?.cover) {
      isColor = task.style.cover.startsWith("#") ? true : false;
    }
    let duDateStatus = task.isDone;
    if (!duDateStatus && task.duDate > Date.now()) duDateStatus = "late";

    return (
      <section className="archived-task-preview">
        <div className="card" onClick={this.onOpenEditCard}>
          {task.style?.cover && (
            <div
              className="pic"
              style={{
                backgroundColor: task.style ? task.style.bgColor : "none",
              }}
            >
              {isColor && (
                <div
                  className="card-cover"
                  style={{ backgroundColor: task.style.cover }}
                ></div>
              )}
              {!isColor && (
                <div
                  className="img-cover"
                  style={{ backgroundImage: `url(${task.style.cover})` }}
                  alt=""
                />
              )}
            </div>
          )}
          <div className="card-details">
            <div className="labels">
              {task.labels &&
                task.labels.map((label) => {
                  return (
                    <span
                      key={label.id}
                      className={`card-label ${this.props.isLabelOpen}`}
                      style={{ backgroundColor: label.color }}
                      onClick={this.props.toggleOpenLabel}
                    >
                      <span className={`label-title ${this.props.isLabelOpen}`}>
                        {label.title}
                      </span>
                    </span>
                  );
                })}
            </div>
            <div>{task.title}</div>
            <div className="icons-container">
              <div className="card-icons">
                {task.dueDate && (
                  <div className={`icon du-date-${duDateStatus}`}>
                    <div
                      className={`du-date ${task.isDone}`}
                      onClick={this.props.toggleTaskDone}
                      //   ref={duDateRef}
                    >
                      {!task.isDone && (
                        <MdCheckBoxOutlineBlank className="svg isDone" />
                      )}
                      {task.isDone && <BsCheck2Square className="svg isDone" />}
                      <AiOutlineClockCircle className="svg clock" />
                      <span>{this.getDateTemplate(task)}</span>
                    </div>
                  </div>
                )}
                {task.description && (
                  <div className="icon">
                    <CgDetailsMore className="svg" />
                  </div>
                )}
                {task.comments && (
                  <div className="icon">
                    <BiMessageRounded className="svg" />
                    <span>{task.comments.length}</span>
                  </div>
                )}
                {task.checklists && (
                  <div
                    className={`icon checklist-${this.props.checkIsListDone}`}
                  >
                    <BsCheck2Square className="svg" />
                    <span>{this.getCheckListCount()}</span>
                  </div>
                )}
                {task.attachments && (
                  <div className="icon">
                    <MdAttachFile className="svg" />
                    <span>{task.attachments.length}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="archive-options">
          <a className="option" onClick={this.toggleArchive}>
            Send to board
          </a>{" "}
          -<a className="option">Delete</a>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
  };
}

const mapDispatchToProps = {
  onEditBoard,
};

export const ArchivedTaskPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ArchivedTaskPreview);
