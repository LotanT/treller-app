import React from "react";
import { ArchivedTaskPreview } from "./ArchivedTaskPreview";

export class ArchivedTasksList extends React.Component {
  state = {
    tasks: null,
  };

  componentDidMount() {
    const { tasks } = this.props;
    this.setState({ tasks });
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.tasks !== this.props.tasks){
      const { tasks } = this.props;
    this.setState({ tasks });
    }
  }

  render() {
    const { tasks } = this.state;
    const { board } = this.props;
    if (!tasks) return <span>Loading..</span>;
    return (
      <section className="archived-tasks-list">
        {tasks.map((task) => (
          <ArchivedTaskPreview
            task={task}
            key={task.id}
            board={board}
            openEditCard={this.props.openEditCard}
          />
        ))}
      </section>
    );
  }
}
