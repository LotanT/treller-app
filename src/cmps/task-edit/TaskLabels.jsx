import React from "react";
import { BsPlus } from "react-icons/bs";

export class TaskLabels extends React.Component {
  state = {};

  render() {
    if (!this.props.labels) return <span></span>;
    return (
      <section className="top-details">
        <h3>Labels</h3>
        <div className="flex top-detail">
          {this.props.labels && (
            <div className="labels-container flex">
              {this.props.labels.map((label) => (
                <div
                  key={label.id}
                  style={{ backgroundColor: label.color }}
                  className="label"
                >
                  <div>{label.title}</div>
                </div>
              ))}
            </div>
          )}
          <a className="grey-btn label">
            <BsPlus />
          </a>
        </div>
      </section>
    );
  }
}
