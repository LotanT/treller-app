import React from "react";
import { BsPerson } from "react-icons/bs";
import { IoMdCheckboxOutline } from "react-icons/io";
import { FiClock } from "react-icons/fi";
import { FaRegWindowMaximize } from "react-icons/fa";
import { BsTag } from "react-icons/bs";

export function EditMenu() {
  return (
    <section className="edit-menu">
      <h3>Add to card</h3>
      <a className="menu-btn">
        <span className="menu-icon">
          <BsPerson />
        </span>
        <span className="menu-text">Members</span>
      </a>
      <a className="menu-btn">
        <BsTag />
        <span className="menu-text">Labels</span>
      </a>
      <a className="menu-btn">
        <span className="menu-icon">
          <IoMdCheckboxOutline />
        </span>
        <span className="menu-text">CheckList</span>
      </a>
      <a className="menu-btn">
        <span className="menu-icon">
          <FiClock />
        </span>
        <span className="menu-text">Dates</span>
      </a>
      <a className="menu-btn">
        <span className="menu-icon">
          <FaRegWindowMaximize />
        </span>
        <span className="menu-text">Cover</span>
      </a>
    </section>
  );
}
