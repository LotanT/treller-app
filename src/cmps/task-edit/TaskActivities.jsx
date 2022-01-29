import React from "react";

import { GrList } from "react-icons/gr";

export class TaskActivities extends React.Component {
  state = {};

  render() {
    return (
      <section className="task-comments">
        <div className="title">
          <div className="left-title">
            <a className="checklist-icon">
              <GrList />
            </a>
            <h5>Activities</h5>
          </div>
          <a className="grey-btn delete-btn">Show details</a>
        </div>
      </section>
    );
  }
}
