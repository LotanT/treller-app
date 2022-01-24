import React from "react";
import { BsPlus } from "react-icons/bs";

export class TaskMembers extends React.Component {
  state = {};

  render() {
    if (!this.props.members) return <span></span>;
    return (
      <section className="top-details">
        <h3>Members</h3>
        <div className="flex top-detail">
          {this.props.members && (
            <div className="members-container">
              {this.props.members.map((member) => (
                <div key={member._id} className="member">
                  <img src={member.imgUrl} />
                </div>
              ))}
            </div>
          )}
          <a className="grey-btn member">
            <BsPlus />
          </a>
        </div>
      </section>
    );
  }
}
