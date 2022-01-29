import React from "react";
import { useHistory } from "react-router-dom";

import { TiStarOutline } from "react-icons/ti";
import goldStarIcon from "../../assets/imgs/user-boards/gold-star.png";

export function BoardPreview(props) {
  const { board, onEditBoard } = props;
  const { _id, title, style } = board;
  const { bgImg } = style;

  const starRef = React.createRef();
  const goldStarRef = React.createRef();
  let history = useHistory();

  const onToggleStar = () => {
    const newBoard = { ...board };
    newBoard.isStarred = !newBoard.isStarred;
    onEditBoard(newBoard);
  };

  const handleClick = (e) => {
    if (
      starRef?.current?.contains(e.target) ||
      goldStarRef?.current?.contains(e.target)
    ) {
      onToggleStar();
    } else history.push(`/${_id}`);
  };

  return (
    <div className="board-preview" style={{ background: `url(${bgImg})` }}>
      <div className="link" onClick={handleClick}>
        <div className="board-preview-screen"></div>
        <h2>{title}</h2>
        {board?.isStarred ? (
          // <div ref={goldStarRef} className="star-container">
          <img
            src={goldStarIcon}
            ref={goldStarRef}
            className="star-btn star-container"
          />
        ) : (
          // </div>
          <div className="test" ref={starRef}>
            <TiStarOutline color="white" className="star-btn" />
          </div>
        )}
      </div>
    </div>
  );
}
