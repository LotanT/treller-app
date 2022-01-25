import React from "react";
import { connect } from "react-redux";
import { CheckList } from "./CheckList";
import { TaskComments } from "./TaskComments";
import { EditableText } from "./EditableText";
import { EditMenu } from "./EditMenu";
import { GrTextAlignFull } from "react-icons/gr";
import { GrClose } from "react-icons/gr";
import { FaPager } from "react-icons/fa";
import { taskService } from "../../services/task.service";
import { loadBoard, onEditBoard } from "../../store/board.actions";
import { TaskMembers } from "./TaskMembers";
import { TaskDate } from "./TaskDate";
import { TaskLabels } from "./TaskLabels";

class _TaskEdit extends React.Component {
  state = {
    task: null,
    isEdit: false,
  };

  componentDidMount() {
    this.props.loadBoard(this.props.match.params.boardId);
    if (!this.state.task?.description) {
      const isEdit = true;
      this.setState({ isEdit });
    }
  }

  loadTask = () => {
    const task = taskService.getTaskById(
      this.props.board,
      this.props.match.params.taskId
    );
    this.setState({ task });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.task === null) {
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
          {task.style?.bgColor && (
            <div
              className="cover"
              style={{ backgroundColor: task.style.bgColor }}
            >
              <a className="close-edit-page-btn">
                <GrClose
                  style={{ fill: "#1d3663" }}
                  onClick={() =>
                    this.props.history.push(
                      `/${this.props.match.params.boardId}`
                    )
                  }
                />
              </a>
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
              {!task.cover && (
                <a className="close-edit-page-btn">
                  <GrClose
                    style={{ fill: "#1d3663" }}
                    onClick={() =>
                      this.props.history.push(
                        `/${this.props.match.params.boardId}`
                      )
                    }
                  />
                </a>
              )}
            </div>
            <div className="flex">
              <div className="task">
                <div className="task-details">
                  <div className="flex top-details-container">
                    {task.members && <TaskMembers members={task.members} />}
                    {task.labels && <TaskLabels labels={task.labels} />}
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
                <TaskComments />
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
