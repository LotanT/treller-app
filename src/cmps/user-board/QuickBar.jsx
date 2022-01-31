import { GrClose } from "react-icons/gr";
import { BsStar } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { CgDetailsMore } from "react-icons/cg";
import { BiMessageRounded } from "react-icons/bi";
import { BsCheck2Square } from "react-icons/bs";
import { MdAttachFile } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { QuickBarBtn } from "./QuickBarBtn";
import React, { useEffect, useState } from "react";

export function QuickBar({
  task,
  cardPos,
  toggleIsQuickEditOpen,
  quickEditRef,
  duDateStatus,
  toggleTaskDone,
  getDateTemplate,
  checkIsListDone,
  getCheckListCount,
  isColor,
  updateTaskTitle,
  openEditCard,
  onTaskArchived,
}) {
  const [taskTitle, setTaskTitle] = useState(task.title);

  const saveBtnRef = React.createRef();
  const cardRef = React.createRef();
  const sideBarRef = React.createRef();

  let top = cardPos.top - 5;
  const left = cardPos.right - 252;
  let pos;
  let side;
  let posTop;
  const cardHeight = 250
  const cardHeightWithPic = 350
  if (window.innerWidth - cardPos.right < 310) {
    side = "right";
    pos = "-200px";
  }
  // console.log(top,window.innerHeight,cardPos.top)
  if (window.innerHeight - cardPos.top < 250) {
    posTop = "-150px";
  }
  if (window.innerHeight - cardPos.top < 220) {
    top = window.innerHeight - 230;
    // console.log(top);
  }
  if (window.innerHeight - cardPos.top < 350 && isColor === false) {
    top = window.innerHeight - 380;
    posTop = "0px";
    // console.log(top,isColor);
  }
  const handleClick = (e) => {
    if (
      saveBtnRef?.current?.contains(e.target) ||
      cardRef?.current?.contains(e.target) ||
      sideBarRef?.current?.contains(e.target)
    ) {
      return;
    }
    toggleIsQuickEditOpen();
  };

  const handleEditTitle = (ev) => {
    setTaskTitle(ev.target.value);
  };

  return (
    <div className="quick-bar-editor" onClick={handleClick} ref={quickEditRef}>
      <div className="quick-bar-exit">
        <GrClose />
      </div>
      <div
        className="quick-edit-card-container"
        style={{ top: top, left: left, backgroundColor: "white" }}
      >
        <div
          className="quick-bar-editor-card"
          style={{ backgroundColor: "white" }}
          ref={cardRef}
        >
          {task.style?.cover && (
            <div className="pic">
              {isColor && (
                <div
                  className="card-cover"
                  style={{ backgroundColor: task.style.cover }}></div>
              )}
              {!isColor && (<div className="img-cover" style={{ backgroundImage: `url(${task.style.cover})` }}></div>)}

            </div>
          )}
          <div
            className="labels quick-edit-labels"
            style={{ backgroundColor: "#ffffff" }}
          >
            {task.labels &&
              task.labels.map((label) => {
                return (
                  <span
                    key={label.id}
                    className={`card-label`}
                    style={{ backgroundColor: label.color }}
                  ></span>
                );
              })}
          </div>
          <div className="card-composer title">
            <div className="list-card-composer">
              <textarea
                onChange={handleEditTitle}
                dir="auto"
                value={taskTitle}
                autoFocus
                placeholder="Enter a title for this card..."
              ></textarea>
            </div>
          </div>
          <div className="icons-container">
            <div className="card-icons">
              {task.dueDate && (
                <div className={`icon du-date-${duDateStatus}`}>
                  <div
                    className={`du-date ${task.isDone}`}
                    onClick={toggleTaskDone}
                  >
                    {!task.isDone && (
                      <MdCheckBoxOutlineBlank className="svg isDone" />
                    )}
                    {task.isDone && <BsCheck2Square className="svg isDone" />}
                    <AiOutlineClockCircle className="svg clock" />
                    <span>{getDateTemplate()}</span>
                  </div>
                </div>
              )}
              {task.description && (
                <div className="icon">
                  <CgDetailsMore className="svg" />
                </div>
              )}
              {task.comments && (
                <div className="icon">
                  <BiMessageRounded className="svg" />
                  <span>{task.comments.length}</span>
                </div>
              )}
              {task.checklists && (
                <div className={`icon checklist-${checkIsListDone}`}>
                  <BsCheck2Square className="svg" />
                  <span>{getCheckListCount()}</span>
                </div>
              )}
              {task.attachments && (
                <div className="icon">
                  <MdAttachFile className="svg" />
                  <span>{task.attachments.length}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className="card-composer-control quick-edit-btn-save"
          ref={saveBtnRef}
          onClick={() => updateTaskTitle(taskTitle)}
        >
          <div className="cc-control-section">
            <span
              className="control-section-add-btn"
              // onClick={onAddTaskPreview}
            >
              Save
            </span>
          </div>
        </div>
        <QuickBarBtn
          task={task}
          sideBarRef={sideBarRef}
          openEditCard={openEditCard}
          left={pos}
          float={side}
          posTop={posTop}
          onTaskArchived={onTaskArchived}
        />
      </div>
    </div>
  );
}
