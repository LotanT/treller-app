import React from "react";

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
  };

  toggleIsDone = () => {
    var { todo } = this.state;
    todo.isDone = !this.state.todo.isDone;
    this.setState({ todo });
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
      <section
        className="checklist-todo"
        onClick={() => {
          this.setIsEdit(true);
        }}
      >
        <div className="check-box" onClick={this.toggleIsDone}></div>
        {!isEdit && <h5 className={this.getTitleClass()}>{todo.title}</h5>}
        {isEdit && (
          <div>
            <textarea
              onChange={this.setTitle}
              onBlur={() => this.setIsEdit(false)}
              value={todo.title}
              autoFocus
            ></textarea>
            <a>Save</a> <a onClick={() => this.setIsEdit(false)}>X</a>
          </div>
        )}
      </section>
    );
  }
}
