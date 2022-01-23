import React from "react";
import { connect } from "react-redux";
import { CheckList } from "./CheckList";
import { EditableText } from "./EditableText";
import { EditMenu } from "./EditMenu";
import { GrTextAlignFull } from "react-icons/gr";
import { AiOutlineClose } from "react-icons/ai";
import { FaPager } from "react-icons/fa";
import { taskService } from "../../services/task.service";
import { loadBoard, onEditBoard } from '../../store/board.actions';

class _TaskEdit extends React.Component {
  state = {
    task: null,
    isEdit: false,
  };

  componentDidMount() {
    this.props.loadBoard(this.props.match.params.boardId)
  }

  loadTask = () => {
    // this.props.loadBoard(this.props.match.params.boardId)
    const task = taskService.getTaskById(this.props.board, this.props.match.params.taskId)
    this.setState({ task })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.task === null) {
      // console.log(prevProps.board, this.props.board);

      this.loadTask()
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

  updateTaskProperty = (property, value) => {
    var { task } = this.state;
    task[property] = value;
    const updatedBoard = taskService.updateTask(this.props.board, task)
    this.props.onEditBoard(updatedBoard)
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
    const updatedBoard = taskService.updateTask(this.props.board, task)
    this.props.onEditBoard(updatedBoard)
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
    const updatedBoard = taskService.updateTask(this.props.board, task)
    this.props.onEditBoard(updatedBoard)
  };

  onCreateNewTaskList = ()=>{
    const updatedBoard = taskService.createNewTaskList(this.props.board, this.props.match.params.taskId)
    this.props.onEditBoard(updatedBoard)
  }


  render() {
    let { isEdit, task } = this.state;
    if (!task) return <span></span>
    return (
      <React.Fragment>
        <div className="screen"></div>
        <section className="task-edit">
          <div className="task-header">
            <div className="title flex">
              <div className="lower">
                <FaPager />
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
            <a>
              <AiOutlineClose onClick={() => this.props.history.push(`/${this.props.match.params.boardId}`)} />
            </a>
          </div>
          <div className="flex">
            <div className="task">
              <div className="task-main">
                <div className="description">
                  <GrTextAlignFull />
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
              <a>
                {/* <AiOutlineClose /> */}
              </a>
            </div>
            <EditMenu onCreateNewTaskList={this.onCreateNewTaskList}/>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.board
  }
}

const mapDispatchToProps = {
  loadBoard,
  onEditBoard
};

export const TaskEdit = connect(mapStateToProps, mapDispatchToProps)(_TaskEdit);
