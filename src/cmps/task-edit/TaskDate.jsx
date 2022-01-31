import React from "react";
import { ImCheckboxChecked } from "react-icons/im";

export class TaskDate extends React.Component {
  state = {};

  getDateTemplate = (task) => {
    const month_names_short = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const duDate = new Date(task.dueDate);
    const now = new Date();
    let date = `${month_names_short[duDate.getMonth()]} ${duDate.getDate()}`;
    if (now.getMonth() === duDate.getMonth()) {
      if (now.getDate() === duDate.getDate()) date = "Today";
      else if (now.getDate() === duDate.getDate() - 1) date = "Tomorrow";
      else if (now.getDate() === duDate.getDate() + 1) date = "Yesterday";
    }
    return `${date} at ${duDate.getHours()}:${duDate.getMinutes()}`;
  };

  render() {
    const { task, toggleIsDone } = this.props;
    return (
      <section className="top-details">
        <h3>Due date</h3>
        <div className="flex top-detail">
          {task.dueDate && (
            <div className="date-container flex">
              {!task.isDone && (
                <div className="check-box lower " onClick={toggleIsDone}></div>
              )}
              {task.isDone && (
                <div className="check-box lower" onClick={toggleIsDone}>
                  <ImCheckboxChecked fill="#0079bf" />
                </div>
              )}
              <div className="grey-btn">
                {this.getDateTemplate(task)}
                {task.isDone && (
                  <h5
                    style={{ backgroundColor: "#61BD4F", color: "white" }}
                    className="date-status"
                  >
                    completed
                  </h5>
                )}
                {(!task.isDone && Date.now() > task.dueDate) && (
                  <h5
                    className="date-status"
                    style={{ backgroundColor: "#EB5A46", color: "white" }}
                  >
                    overdue
                  </h5>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
}
