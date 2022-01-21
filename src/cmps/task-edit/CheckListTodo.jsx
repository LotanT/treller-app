import React from "react";
import { IoIosCheckmark } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
// import { IoCheckboxSharp } from "react-icons/io";

export class CheckListTodo extends React.Component {
  state = {
    todo: null,
    isEdit: false,
  };

  componentDidMount() {
    const { todo } = this.props;
    this.setState({ todo });
  }

  setIsEdit = (boolean) => {
    const isEdit = boolean;
    this.setState({ isEdit });
  };

  setTitle = (ev) => {
    var { todo } = this.state;
    todo.title = ev.target.value;
    this.setState({ todo });
    this.props.updateCheckListTodos(todo);
  };

  toggleIsDone = () => {
    var { todo } = this.state;
    todo.isDone = !this.state.todo.isDone;
    this.setState({ todo });
    this.props.updateCheckListTodos(todo);
  };

  getTitleClass = () => {
    var titleClass = "todo-title";
    if (this.state.todo.isDone) titleClass += " checked";
    return titleClass;
  };

  render() {
    const { isEdit, todo } = this.state;
    if (!todo) return <h1>Loading..</h1>;
    return (
      <section className="checklist-todo">
        {!todo.isDone && (
          <div className="check-box" onClick={this.toggleIsDone}></div>
        )}
        {todo.isDone && (
          <div className="check-box" onClick={this.toggleIsDone}>
            <IoIosCheckmark />
          </div>
        )}
        {!isEdit && (
          <h5
            className={this.getTitleClass()}
            onClick={() => {
              this.setIsEdit(true);
            }}
          >
            {todo.title}
          </h5>
        )}
        {isEdit && (
          <div>
            {/* <IoCheckboxSharp /> */}
            <textarea
              onChange={this.setTitle}
              onBlur={() => this.setIsEdit(false)}
              value={todo.title}
              autoFocus
            ></textarea>
            <div className="flex">
              <a className="blue-btn">Save</a>
              <div className="lower" onClick={() => this.setIsEdit(false)}>
                <AiOutlineClose />
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }
}
