import React, { useRef, useState } from "react";
import { connect } from "react-redux";

import { BackgroundSelect } from "./BackgroundSelect";

import { GrClose } from "react-icons/gr";
import { CgAsterisk } from "react-icons/cg";
import { onAddBoard } from "../../../store/board.actions";
//MAP TO BOARD PREV

function _AddBoard({ toggleModal, onAddBoard }) {
  const [boardTitle, setBoardTitle] = useState("");
  const [background, setBackground] = useState(
    "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg"
  );
  const inputModal = useRef(true);

  const createNewBoard = () => {
    if (boardTitle) {
      const board = { title: boardTitle, background: background };
      onAddBoard(board);
      toggleModal();
    } else {
      return;
    }
  };

  const onChangeBoardBackground = (backgroundUrl) => {
    setBackground(backgroundUrl);
  };

  return (
    <div ref={inputModal} className="add-board-pop">
      <div className="add-board-header flex">
        <div className="add-board-title">Create board</div>
        <GrClose fill="#5E6C84" stroke="#5E6C84" onClick={toggleModal} />
      </div>
      <hr />
      <BackgroundSelect
        onChangeBoardBackground={onChangeBoardBackground}
        cutShort={true}
      />
      <div className="add-title">
        <h5>
          Board Title
          <CgAsterisk />
        </h5>
        <input
          type="text"
          required=""
          aria-required="true"
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
        ></input>
      </div>
      <h5>
        👋 <span>Board title is required</span>
      </h5>
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
