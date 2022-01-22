import React from "react";
import { connect } from "react-redux";
import { CheckList } from "./CheckList";
import { EditableText } from "./EditableText";
import { GrTextAlignFull } from "react-icons/gr";
import { AiOutlineClose } from "react-icons/ai";
import { FaPager } from "react-icons/fa";
import { taskService } from "../../services/task.service";

const testTask = {
  id: "c104",
  title: "Help me",
  status: "in-progress",
  description: "description",
  comments: [
    {
      id: "ZdPnm",
      txt: "also @yaronb please CR this",
      createdAt: 1590999817436.0,
      byMember: {
        _id: "u101",
        fullname: "Tal Tarablus",
        imgUrl:
          "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
      },
    },
  ],
  checklists: [
    {
      id: "YEhmF",
      title: "Checklist 1",
      todos: [
        {
          id: "212jX",
          title: "To Do 1",
          isDone: false,
        },
        {
          id: "213jX",
          title: "To Do 2",
          isDone: true,
        },
      ],
    },
    {
      id: "YEhmG",
      title: "Checklist 2",
      todos: [
        {
          id: "214jX",
          title: "To Do 3",
          isDone: false,
        },
      ],
    },
  ],
  members: [
    {
      _id: "u101",
      username: "Tal",
      fullname: "Tal Tarablus",
      imgUrl:
        "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
    },
  ],
  labelIds: ["l101", "l102"],
  createdAt: 1590999730348,
  dueDate: 16156215211,
  byMember: {
    _id: "u101",
    username: "Tal",
    fullname: "Tal Tarablus",
    imgUrl:
      "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
  },
  style: {
    bgColor: "#26de81",
  },
  isArchive: false,
};

class _TaskEdit extends React.Component {
  state = {
    task: testTask,
  };

  // componentDidMount() {
  //   const { taskId } = this.props.match.params;
  //   if (!taskId) return;
  //   else
  //     boardService.getById(taskId).then((task) => {
  //       if (!task) this.history.push("/board");
  //       else this.setState({ task });
  //     });
  // }


  componentDidMount(){
    // this.task= taskService.getTaskById(this.props.match.params.taskId)
    // if(!this.task) this.task= taskService.getTaskById(this.props.match.params.taskId)
    // console.log(this.task);
  }

  
  componentWillUnmount() {
    this.clearState();
  }

  clearState = () => {
    const task = null;
    this.setState({ task });
  };

  updateTaskProperty = (property, value) => {
    this.state.task[property] = value;
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
  };

  // updateCheckListTitle = (checklistId, value) => {
  //   var { checklists } = this.state.task;
  //   const idx = checklists.findIndex(
  //     (checklist) => checklist.id === checklistId
  //   );
  //   checklists[idx].title = value;
  //   this.setState({ checklists });
  // };

  // updateCheckListTodos = (checklistId, todos) => {
  //   var { checklists } = this.state.task;
  //   const idx = checklists.findIndex(
  //     (checklist) => checklist.id === checklistId
  //   );
  //   checklists[idx].todos = todos;
  //   this.setState({ checklists });
  // };

  render() {
    console.log(this.props);
    var { task } = this.state;
    if (!task) return <h1>Loading..</h1>;
    return (
      <React.Fragment>
      <div className="screen"></div>
      <section className="task-edit">
        <div className="task-header">
          <div className="flex">
            <div className="lower">
              <FaPager />
            </div>
            <EditableText
              text={task.title}
              updateFunction={this.updateTaskProperty}
              property={"title"}
            />
          </div>
          <a>
            <AiOutlineClose />
          </a>
        </div>
        <div className="flex">
          <div className="task">
            <div className="task-main">
              <div className="description">
                <GrTextAlignFull />
                <h3>Description</h3>
                <a className="grey-btn">Edit</a>
              </div>
              <EditableText
                text={task.description}
                updateFunction={this.updateTaskProperty}
                property={"description"}
              />
              {task.checklists?.map((checklist) => (
                <CheckList
                  key={checklist.id}
                  checklist={checklist}
                  updateCheckListProperty={this.updateCheckListProperty}
                  checklistId={checklist.id}
                />
              ))}
            </div>
          </div>
          <div className="edit-nav">navbar</div>
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

const mapDispatchToProps = {};

export const TaskEdit = connect(mapStateToProps, mapDispatchToProps)(_TaskEdit);
