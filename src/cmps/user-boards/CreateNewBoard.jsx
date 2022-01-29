import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AddBoard } from "../pop-hover/AddBoard";

export function CreateNewBoard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const toggleModal = ()=>{
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div className="new-board-preview" >
      <div className="board-details" onClick={toggleModal}>
        <h2 className="board-title">Create new board</h2>
      </div>
      {isModalOpen&&<AddBoard toggleModal={toggleModal} />}
    </div>
  );
}
