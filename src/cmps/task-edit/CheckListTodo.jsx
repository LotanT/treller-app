import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { ImCheckboxChecked } from "react-icons/im";

export class CheckListTodo extends React.Component {
  state = {
    todo: null,
    isEdit: false,
    prevTodo: null,
  };

  todoTextareaRef = React.createRef();
  saveTodoBtnRef = React.createRef();
  deleteTodoBtnRef = React.createRef();
  closeTodoBtnRef = React.createRef();

  componentDidMount() {
    console.log("h");
    document.addEventListener("mousedown", this.handleClick);
    const { todo } = this.props;
    this.setState({ todo });
    const prevTodo ={...(this.props.todo)}
    this.setState({ prevTodo });
    if (!todo.title) {
      const isEdit = true;
      this.setState({ isEdit });
    }
    if (!todo.title && !this.state.isEdit) return <div></div>;
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick);
  }

  handleClick = (e) => {
    if (
      this.todoTextareaRef?.current?.contains(e.target) ||
      this.saveTodoBtnRef?.current?.contains(e.target) ||
      this.deleteTodoBtnRef?.current?.contains(e.target) ||
      this.closeTodoBtnRef?.current?.contains(e.target)
    ) {
      return;
    }
    this.setState({ isEdit: false });
  };

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
    this.props.updateCheckListTodos(todo);
  };

  onDeleteTodo = () => {
    this.props.updateCheckListTodos(this.state.todo.id);
  };

  onCloseTodoEdit = (prevState) => {
    console.log('eeee');
    var { todo, prevTodo } = this.state;
    // console.log(todo,prevState);
    // todo.title = {...prevTodo.title};
    this.setState({todo:{...prevTodo}});
    this.setIsEdit(false);
  };

  onSaveEdit = () => {
    console.log('sss');
    this.setIsEdit(false);
    const { todo } = this.state;
    this.props.updateCheckListTodos(todo);
    const prevTodo = todo;
    this.setState({ prevTodo });
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
      <section className={`checklist-todo ${isEdit ? " edit" : ""}`}>
        {!todo.isDone && (
          <div className="check-box" onClick={this.toggleIsDone}></div>
        )}
        {todo.isDone && (
          <div className="check-box" onClick={this.toggleIsDone}>
            <ImCheckboxChecked fill="#0079bf" />
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
          <div className="title">
            <textarea
              onChange={this.setTitle}
              value={todo.title}
              ref={this.todoTextareaRef}
              autoFocus
            ></textarea>
            <div className="space-between">
              <div className="flex">
                <a
                  className="blue-btn"
                  ref={this.saveTodoBtnRef}
                  onClick={this.onSaveEdit}
                >
                  Save
                </a>
                <div className="lower"
                  ref={this.closeTodoBtnRef}
                  onClick={this.onCloseTodoEdit}>
                  <AiOutlineClose />
                </div>
              </div>
              <div
                className="grey-btn"
                ref={this.deleteTodoBtnRef}
                onClick={this.onDeleteTodo}
              >
                Delete
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }
}
