import React from "react";
import { connect } from "react-redux";
import { CheckList } from "./CheckList";
import { TaskActivities } from "./TaskActivities";
import { EditableText } from "./EditableText";
import { EditMenu } from "./EditMenu";
import { GrTextAlignFull } from "react-icons/gr";
import { BsArchiveFill } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { FaPager } from "react-icons/fa";
import { taskService } from "../../services/task.service";
import { loadBoard, onEditBoard } from "../../store/board.actions";
import { TaskMembers } from "./TaskMembers";
import { TaskDate } from "./TaskDate";
import { TaskLabels } from "./TaskLabels";
import { TaskAttachments } from "./TaskAttachments";

class _TaskEdit extends React.Component {
  state = {
    task: null,
    isEdit: false,
    groupTitle: null,
  };

  isColor;

  componentDidMount() {
    this.props.loadBoard(this.props.match.params.boardId);
    if (!this.state.task?.description) {
      const isEdit = true;
      this.setState({ isEdit });
    }
    if (this.state.task?.style.cover) {
      this.isColor = this.state.task?.style.cover.startsWith("#")
        ? true
        : false;
    }
  }

  loadTask = () => {
    const task = taskService.getTaskById(
      this.props.board,
      this.props.match.params.taskId
    );
    if (task?.style.cover) {
      this.isColor = task?.style.cover.startsWith("#") ? true : false;
    }
    this.setState({ task });
    const groupTitle = taskService.getGroupTitle(
      this.props.board,
      this.props.match.params.taskId
    );
    this.setState({ groupTitle });
  };

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.task) {
      this.loadTask();
    }

    if (prevProps.board !== this.props.board) {
      this.loadTask();
    }
  }

  componentWillUnmount() {
    this.clearState();
  }

  clearState = () => {
    const task = null;
    this.setState({ task });
  };

  setIsEdit = (boolean) => {
    const isEdit = boolean;
    this.setState({ isEdit });
  };

  toggleIsDone = () => {
    const isDone = !this.state.task.isDone;
    let task = { ...this.state.task, isDone: isDone };
    this.setState({ task });
    this.updateTaskProperty("isDone", isDone);
  };

  updateTaskProperty = (property, value) => {
    var { task } = this.state;
    task[property] = value;
    const updatedBoard = taskService.updateTask(this.props.board, task);
    this.props.onEditBoard(updatedBoard);
  };

  updateCheckListProperty = (property, value, checklistId) => {
    var { task } = this.state;
    var { checklists } = task;
    const idx = checklists.findIndex(
      (checklist) => checklist.id === checklistId
    );
    checklists[idx][property] = value;
    task.checklists = checklists;
    this.setState({ task });
    const updatedBoard = taskService.updateTask(this.props.board, task);
    this.props.onEditBoard(updatedBoard);
  };

  deleteCheckList = (checklistId) => {
    var { task } = this.state;
    var { checklists } = task;
    const idx = checklists.findIndex(
      (checklist) => checklist.id === checklistId
    );
    checklists.splice(idx, 1);
    task.checklists = checklists;
    this.setState({ task });
    const updatedBoard = taskService.updateTask(this.props.board, task);
    this.props.onEditBoard(updatedBoard);
  };

  onCreateNewTaskList = async (title) => {
    const updatedBoard = taskService.createNewTaskList(
      this.props.board,
      this.props.match.params.taskId,
      title
    );
    await this.props.onEditBoard(updatedBoard);
  };

  render() {
    let { isEdit, task } = this.state;
    if (!task) return <span></span>;
    return (
      <section className="window-edit">
        <div
          className="screen"
          onClick={() =>
            this.props.history.push(`/${this.props.match.params.boardId}`)
          }
        ></div>
        <section className="task-edit">
          <div
            className="close-edit-page-btn"
            onClick={() =>
              this.props.history.push(`/${this.props.match.params.boardId}`)
            }
          >
            <GrClose style={{ fill: "#1d3663" }} />
          </div>
          {task.style?.cover && (
            <div className="cover-container-img">
              {this.isColor && (
                <div
                  className="card-cover"
                  style={{ backgroundColor: task.style.cover }}
                ></div>
              )}
              {!this.isColor && (
                <div
                  className="card-cover-img"
                  style={{ background: `url(${task.style.cover})` }}
                ></div>
              )}
            </div>
          )}
          {task.isArchive && (
            <div className="archive-cover">
              <div className="archive-cover-text">
                <BsArchiveFill /> <span>This card is archived.</span>
              </div>
            </div>
          )}
          <div className="no-cover-container">
            <div className="task-header">
              <div className="title flex">
                <div className="lower">
                  <FaPager style={{ fill: "#1d3663" }} />
                </div>
                <EditableText
                  text={task.title}
                  updateFunction={this.updateTaskProperty}
                  property={"title"}
                  setIsEdit={() => {
                    return;
                  }}
                />
              </div>
            </div>
            <div className="flex">
              <div className="task">
                <div className="task-details">
                  <div className="group-title">
                    in list <span>{`${this.state.groupTitle}`}</span>
                  </div>
                  <div className="flex top-details-container">
                    {task.members && <TaskMembers members={task.members} />}
                    {Boolean(task.labels?.length) && (
                      <TaskLabels labels={task.labels} />
                    )}
                    {task.dueDate && (
                      <TaskDate task={task} toggleIsDone={this.toggleIsDone} />
                    )}
                  </div>
                  <div className="description">
                    <GrTextAlignFull style={{ fill: "#1d3663" }} />
                    <h3>Description</h3>
                    {!isEdit && <a className="grey-btn">Edit</a>}
                  </div>
                  <div className="desc-editable-text">
                    <EditableText
                      text={task.description}
                      updateFunction={this.updateTaskProperty}
                      property={"description"}
                      setIsEdit={this.setIsEdit}
                    />
                  </div>

                  {task.attachments && <TaskAttachments task={task} />}

                  {task.checklists?.map((checklist) => (
                    <CheckList
                      key={checklist.id}
                      checklist={checklist}
                      checklistId={checklist.id}
                      updateCheckListProperty={this.updateCheckListProperty}
                      deleteCheckList={this.deleteCheckList}
                    />
                  ))}
                </div>
                <TaskActivities />
              </div>
              <EditMenu
                onCreateNewTaskList={this.onCreateNewTaskList}
                taskId={task.id}
                coverExist={task.cover}
              />
            </div>
          </div>
        </section>
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
  loadBoard,
  onEditBoard,
};

export const TaskEdit = connect(mapStateToProps, mapDispatchToProps)(_TaskEdit);
