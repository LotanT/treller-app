import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";

// import { Link, NavLink } from 'react-router-dom'
import { GrClose } from "react-icons/gr";
import { onAddBoard } from "../../store/board.actions";

//MAP TO BOARD PREV

function _AddBoard({ isOpenModal, closeModal, onAddBoard }) {
  const [boardTitle, setBoardTitle] = useState("");

  const inputModal = useRef(true);

  useEffect(() => {
    if (isOpenModal) {
      inputModal.current.classList.remove("hidden");
    } else if (!isOpenModal) inputModal.current.classList.add("hidden");
  }, [isOpenModal]);

  const createNewBoard = () => {
    if (boardTitle) {
      onAddBoard(boardTitle);
      closeModal();
    } else {
      return;
    }
  };

  return (
    <div ref={inputModal} className="add-board-pop">
      <div className="add-board-header flex">
        <div className="add-board-title">Create board</div>
        <GrClose fill="#5e6c84" stroke="#5e6c84" />
      </div>
      <hr />
      <div className="add-title">
        <h5>Board Title:</h5>
        <input
          type="text"
          required=""
          aria-required="true"
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
        ></input>
      </div>
      <button className="btn create-board" onClick={createNewBoard}>
        Create
      </button>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  onAddBoard,
};
export const AddBoard = connect(mapStateToProps, mapDispatchToProps)(_AddBoard);
