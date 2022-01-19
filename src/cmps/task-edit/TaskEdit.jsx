import React from "react";
import CreatableSelect from "react-select/creatable";
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { boardService } from "../../services/boards.service";
import { utilService } from "../../util.service";

const testTask = {
  id: "c101",
  title: "Workout",
  description: "workout long and hard",
  isArchive: false,
};

class _TaskEdit extends React.Component {
  state = {
    task: null,
    edit: null,
  };

  //check if get task from service or store
  componentDidMount() {
    const { taskId } = this.props.match.params;
    if (!taskId) return;
    else
      boardService.getById(taskId).then((task) => {
        if (!task) this.history.push("/board");
        else this.setState({ task });
      });
  }

  componentWillUnmount() {
    this.clearState();
  }

//אה
  clearState = () => {
    const clearedState = {
      task: null,
      edit:null
    }
    this.setState(clearedState);
  };

  getTaskLabels = () => {
    const { labels } = this.state.task;
    return labels.map((label) => ({ value: label, label }));
  };

  render() {
    var { task, edit } = this.state;
    if (!task) return <h1>Loading..</h1>;
    return (
      <section className="task-edit">
        {edit !== "name" && <label htmlFor="name">Name:</label>}
        {edit == "name" && (
          <input
            name="name"
            type="text"
            onChange={this.handleChange}
            value={task.name}
          />
        )}
        <h1>In list: <Link></Link></h1>

      </section>
    );
  }
}

function mapStateToProps({ taskModule }) {
  return {};
}

const mapDispatchToProps = {
  removetask,
  savetask,
};

export const taskEdit = connect(mapStateToProps, mapDispatchToProps)(_taskEdit);
