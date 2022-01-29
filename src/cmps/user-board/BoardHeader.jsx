import { BsStar } from "react-icons/bs";
import { BsFillPeopleFill } from "react-icons/bs";
import { BiFilter } from "react-icons/bi";
import { MdMoreHoriz } from "react-icons/md";
import { BsArchiveFill } from "react-icons/bs";
// BsStar

export function BoardHeader({ board }) {
  return (
    <div className="board-header">
      <div className="board-header-left">
        <div className="board-name">{board.title}</div>
        <div className={`starred ${board.isStarred}`}>
          <BsStar />
        </div>
        {board.members && (
          <div className="board-members">
            {board.members.map((member) => (
              <div key={member._id} className="member">
                {" "}
                <img src={member.imgUrl} />
              </div>
            ))}
          </div>
        )}
        <div className="card-composer-control board-header-invite-btn">
          <div className="cc-control-section">
            <span className="control-section-add-btn">
              <BsFillPeopleFill />
              Invite
            </span>
          </div>
        </div>
      </div>
      <div className="board-header-right">
        <div className="show-menu">
          <span className="icon">
            <BsArchiveFill />
          </span>
          <span>Archive</span>
        </div>
        <div className="filter">
          <span className="icon">
            <BiFilter />
          </span>
          <span>Filter</span>
        </div>
      </div>
    </div>
  );
}
