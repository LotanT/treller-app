import React from "react";
import { utilService } from "../../services/util.service";
import { CheckListTodo } from "./CheckListTodo";
import { EditableText } from "./EditableText";
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
    this.props.updateCheckListProperty("todos", todos, checklist.id);
  };

  deleteTodo = (todos, todoId) => {
    const idx = todos.findIndex((todo) => todo.id === todoId);
    return todos.splice(idx, 1);
  };

  getEmptyTodo = () => {
    return {
      id: utilService.makeId(),
      title: "",
      description: "",
      isDone: false,
    };
  };

  setIsEdit = (boolean) => {
    const isEdit = boolean;
    this.setState({ isEdit });
  };

  render() {
    const { checklist, isEdit } = this.state;
    if (!checklist) return <span>Loading..</span>;
    return (
      <section className="checklist">
        <div className="title">
          <div className="left-title">
            <div className="checklist-icon">
              <IoMdCheckboxOutline />
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
            <a
              className="grey-btn delete-btn"
              onClick={() => this.props.deleteCheckList(checklist.id)}
            >
              Delete
            </a>
          )}
        </div>
        {checklist.todos?.map((todo) => (
          <CheckListTodo
            key={todo.id}
            todo={todo}
            updateCheckListTodos={this.updateCheckListTodos}
          />
        ))}
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
