import React from "react";
import { BsPlus } from "react-icons/bs";

export class TaskLabels extends React.Component {
  state = {};

  render() {
    if (!this.props.labels) return <span></span>;
    return (
      <section className="top-details">
        <h3>Members</h3>
        <div className="flex top-detail">
          {this.props.labels && (
            <div className="labels-container">
              {this.props.labels.map((label) => (
                <div key={label._id} className="label">
                  <img src={label.imgUrl} />
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
