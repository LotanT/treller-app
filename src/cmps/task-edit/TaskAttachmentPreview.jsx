import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { utilService } from "../../services/util.service";
import { onEditBoard } from "../../store/board.actions";
import { taskService } from "../../services/task.service";

import { CgScreenWide } from "react-icons/cg";

function _TaskAttachmentsPreview(props) {
  let { attach, task } = props;
  const [attachImg, setAttachImg] = useState(attach.isImg ? attach.url : "https://i.ibb.co/cJq4Hbk/file.jpg");
  const [isAttachImg, setIsAttachImg] = useState(attachImg !== "https://i.ibb.co/cJq4Hbk/file.jpg");
  const [makeItCoverTxt, setMakeItCoverTxt] = useState("");
  const [isCover, setIsCover] = useState(false);

  useEffect(() => {
    setAttachImg(attach.isImg ? attach.url : "https://i.ibb.co/cJq4Hbk/file.jpg");
    setIsCover(attachImg === task.style?.cover);
    setMakeItCoverTxt(!isCover ? "Make Cover" : "Remove cover");
  }, [props.board]);


  const toggleCover = async () => {
    let updatedBoard = taskService.toggleCoverToTask(
      props.board,
      task.id,
      attachImg
      );
      await props.onEditBoard(updatedBoard);
      setIsCover(attach.url === task.style?.cover);
      setMakeItCoverTxt(!isCover ? "Make Cover" : "Remove cover");

  };

  return (
    <div className="attach-thumb">
      <a className="attach-img" style={{ background: `url(${attachImg})` }} />
      <div className="attach-details">
        <span className="attach-details-title">
          {attach.name.substring(0, 45)}
        </span>
        <br />
        <span className="attach-quit-details">
          <span>Added {utilService.timeSince(attach.createdAt)}</span>
          {isAttachImg && (
            <div className="flex make-cover-attach" onClick={toggleCover}>
              <CgScreenWide /> <a>{makeItCoverTxt}</a>
            </div>
          )}
        </span>
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
  };
}
const mapDispatchToProps = {
  onEditBoard,
};

export const TaskAttachmentsPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_TaskAttachmentsPreview);
