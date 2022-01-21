import React from "react";
import { CheckListTodo } from "./CheckListTodo";
import { EditableText } from "./EditableText";
import { IoMdCheckboxOutline } from "react-icons/io";

export class CheckList extends React.Component {
  state = {
    checklist: null,
  };

  componentDidMount() {
    const { checklist } = this.props;
    this.setState({ checklist });
  }

  updateCheckListTodos = (updatedTodo) => {
    const { checklist } = this.state;
    var { todos } = checklist;
    const idx = todos.findIndex((todo) => todo.id === updatedTodo.id);
    todos[idx] = updatedTodo;
    checklist.todos = todos;
    this.setState({ checklist });
    this.props.updateCheckListProperty("todos", todos, checklist.id);
  };

  render() {
    const { checklist } = this.props;
    return (
      <section className="checklist">
        <div className="title">
          <div className="left-title">
            <IoMdCheckboxOutline />
            <EditableText
              text={checklist.title}
              updateFunction={this.props.updateCheckListProperty}
              checklistId={checklist.id}
              property={"title"}
            />
          </div>
          <a className="grey-btn">Delete</a>
        </div>
        {checklist.todos?.map((todo) => (
          <CheckListTodo
            key={todo.id}
            todo={todo}
            updateCheckListTodos={this.updateCheckListTodos}
          />
        ))}
        <a className="grey-btn add-checklist-todo">Add an item</a>
      </section>
    );
  }
}
