import React from "react";
import { utilService } from "../../services/util.service";
import { CheckListTodo } from "./CheckListTodo";
import { EditableText } from "./EditableText";
import { ProgressionBar } from "./PrgressionBar";
import { IoMdCheckboxOutline } from "react-icons/io";

export class CheckList extends React.Component {
  state = {
    checklist: null,
    isEdit: false,
  };

  componentDidMount() {
    const { checklist } = this.props;
    this.setState({ checklist });
  }

  setIsEdit = (boolean) => {
    const isEdit = boolean;
    this.setState({ isEdit });
  };

  updateCheckListTodos = (todoToUpdate) => {
    const { checklist } = this.state;
    var { todos } = checklist;

    if (!todoToUpdate) {
      todoToUpdate = this.getEmptyTodo();
      todos[todos.length] = todoToUpdate;
    } else if (!todoToUpdate.title) {
      this.deleteTodo(todos, todoToUpdate);
    } else {
      const idx = todos.findIndex((todo) => todo.id === todoToUpdate.id);
      todos[idx] = todoToUpdate;
    }
    checklist.todos = todos;
    this.setState({ checklist });
    // console.log(todos);
    this.props.updateCheckListProperty("todos", todos, checklist.id);
  };

  deleteTodo = (todos, todoId) => {
    const idx = todos.findIndex((todo) => todo.id === todoId);
    return todos.splice(idx, 1);
  };

  getEmptyTodo = () => {
    return {
      id: utilService.makeId(),
      title: null,
      isDone: false,
    };
  };

  setIsEdit = (boolean) => {
    const isEdit = boolean;
    this.setState({ isEdit });
  };

  getBarPercentage = () => {
    let { todos } = this.state.checklist;
    let realTodos = [];
    todos.forEach((todo) => {
      if (todo.title) realTodos.push(todo);
    });
    const denominator = realTodos.length ? realTodos.length : 1;
    let doneTodosNum = 0;
    todos.map((todo) => {
      if (todo.isDone) {
        doneTodosNum++;
      }
    });
    return parseInt(`${(doneTodosNum * 100) / denominator}`);
  };

  getCheckedNum = () => {
    const { todos } = this.state.checklist;
    let count = 0;
    todos.forEach((todo) => {
      if (todo.isDone) count++;
    });
    return count;
  };

  toggleHide = () => {
    let { checklist } = this.state;
    let { isHide } = checklist;
    checklist = { ...checklist, isHide: !isHide };
    // console.log(checklist.isHide);
    this.setState({ checklist });
    this.props.updateCheckListProperty("isHide", isHide, checklist.id);
  };

  render() {
    const { checklist, isEdit } = this.state;
    if (!checklist) return <span>Loading..</span>;
    return (
      <section className="checklist">
        <div className="title">
          <div className="left-title">
            <div className="checklist-icon">
              <IoMdCheckboxOutline style={{ fill: "#1d3663" }} />
            </div>
            <EditableText
              text={checklist.title}
              updateFunction={this.props.updateCheckListProperty}
              checklistId={checklist.id}
              property={"title"}
              setIsEdit={this.setIsEdit}
            />
          </div>
          {!isEdit && (
            <div className="flex checklist-title-btns">
              {!checklist.isHide && (
                <a className="grey-btn delete-btn" onClick={this.toggleHide}>
                  Hide checked items
                </a>
              )}
              {checklist.isHide && (
                <a className="grey-btn delete-btn" onClick={this.toggleHide}>
                  Show checked Items({this.getCheckedNum()})
                </a>
              )}
              <a
                className="grey-btn delete-btn"
                onClick={() => this.props.deleteCheckList(checklist.id)}
              >
                Delete
              </a>
            </div>
          )}
        </div>
        <ProgressionBar completed={this.getBarPercentage()} />
        {checklist.todos?.map((todo) => (
          <CheckListTodo
            key={todo.id}
            todo={todo}
            updateCheckListTodos={this.updateCheckListTodos}
            isHide={checklist.isHide}
          />
        ))}
        {checklist.isHide && this.getBarPercentage() === 100 && (
          <h5 className="complete-str">
            Everything in this checklist is complete!
          </h5>
        )}
        <a
          className="grey-btn add-checklist-todo"
          onClick={() => this.updateCheckListTodos()}
        >
          Add an item
        </a>
      </section>
    );
  }
}
