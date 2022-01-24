import React from "react";

import { BsPerson } from "react-icons/bs";
import { IoMdCheckboxOutline } from "react-icons/io";
import { FiClock } from "react-icons/fi";
import { FaRegWindowMaximize } from "react-icons/fa";
import { BsTag } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdOutlineContentCopy } from "react-icons/md";
import { GrList } from "react-icons/gr";

import { AddCheckList } from "../pop-hover/AddCheckList";
import { AddLabel } from "../pop-hover/AddLabel";

export class EditMenu extends React.Component {
  state = {
    isAddCheckList: false,
    isLabel: false,
    isAddMembers: false,
  };

  toggleModal = (popHover) => {
    const stateCopy = { ...this.state };
    const nextValue = !stateCopy[popHover];
    Object.keys(stateCopy).forEach((key) => (stateCopy[key] = false));
    stateCopy[popHover] = nextValue;
    this.setState(stateCopy);
  };

  render() {
    const { isAddCheckList, isLabel } = this.state;
    return (
      <section className="edit-menu">
        <h3>Add to card</h3>

        <a
          className="menu-btn"
          onClick={() => this.toggleModal("isAddMembers")}
        >
          <span className="menu-icon">
            <BsPerson />
          </span>
          <span className="menu-text">Members</span>
        </a>

        <a className="menu-btn" onClick={() => this.toggleModal("isLabel")}>
          <BsTag />
          <span className="menu-text">Labels</span>
        </a>
        {isLabel && (
          <AddLabel toggleModal={this.toggleModal} taskId={this.props.taskId} />
        )}

        <a
          className="menu-btn"
          onClick={() => this.toggleModal("isAddCheckList")}
        >
          <span className="menu-icon">
            <IoMdCheckboxOutline />
          </span>
          <span className="menu-text">CheckList</span>
        </a>
        {isAddCheckList && (
          <AddCheckList
            onCreateNewTaskList={this.props.onCreateNewTaskList}
            toggleModal={this.toggleModal}
          />
        )}

        <a className="menu-btn">
          <span className="menu-icon">
            <FiClock />
          </span>
          <span className="menu-text">Dates</span>
        </a>
        {!this.props.coverExists && (
          <a className="menu-btn">
            <span className="menu-icon">
              <FaRegWindowMaximize />
            </span>
            <span className="menu-text">Cover</span>
          </a>
        )}

        <h3>Actions</h3>
        <a className="menu-btn">
          <span className="menu-icon">
            <AiOutlineArrowRight />
          </span>
          <span className="menu-text">Move</span>
        </a>
        <a className="menu-btn">
          <span className="menu-icon">
            <MdOutlineContentCopy />
          </span>
          <span className="menu-text">Copy</span>
        </a>
      </section>
    );
  }
}
