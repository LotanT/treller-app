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
    console.log(e);
    if (
      starRef?.current?.contains(e.target) ||
      goldStarRef?.current?.contains(e.target)
    ) {
      return;
    }
    history.push(`/${_id}`);
  };

  return (
    <div className="board-preview" style={{ background: `url(${bgImg})` }}>
      <div className="link" onClick={handleClick}>
        <div className="board-preview-screen"></div>
        <div className="board-preview-content">
          {/* <div className="board-details"> */}
          <h2>{title}</h2>
          {/* </div> */}
          {board?.isStarred ? (
            <img
              src={goldStarIcon}
              ref={goldStarRef}
              className="star-btn"
              onClick={onToggleStar}
            />
          ) : (
            <div ref={starRef} className="gold-btn">
              <TiStarOutline
                color="white"
                className="star-btn"
                onClick={onToggleStar}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
