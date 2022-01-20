import React from "react";
import { CheckListTodo } from "./CheckListTodo";
import { EditableText } from "./EditableText";

export class CheckList extends React.Component {
  state = {
    checklist: null,
  };

  componentDidMount() {
    const { checklist } = this.props;
    this.setState({ checklist });
  }

  render() {
    const { checklist } = this.props;
    return (
      <section className="checklist">
        <div className="title">
          <EditableText text={checklist.title} />
          <a className="grey-btn">Delete</a>
        </div>
        {checklist.todos?.map((todo) => (
          <CheckListTodo key={todo.id} todo={todo} />
        ))}
        <a className="grey-btn">Add an todo</a>
      </section>
    );
  }
}
