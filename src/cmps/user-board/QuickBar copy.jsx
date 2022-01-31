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

  let cardTop = cardPos.top;
  const cardLeft = cardPos.right;
  let btnsTop
  let btnsLeft = 278
  let btnFloat = 'left'
  const space = 20
  const btnsBarHeight = 310
  const btnsBarWidth = 180 + space;
  const cardHeight = 180 + space
  const cardHeightWithPic = 380 + space
 
  if (window.innerWidth - cardPos.right - btnsLeft < btnsBarWidth) {
    btnFloat = 'right';
    btnsLeft = '-149px';
  }
  if (window.innerHeight - cardPos.top < btnsBarHeight) {
    btnsTop = '-161px';
  }
  if (window.innerHeight - cardPos.top < cardHeight) {
    cardTop = window.innerHeight - cardHeight;
  }
  if (window.innerHeight - cardPos.top < cardHeightWithPic && isColor === false) {
    cardTop = window.innerHeight - cardHeightWithPic;
    btnsTop = "0px";
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
        style={{ top: cardTop, left: cardLeft, backgroundColor: "white" }}
      >
        <div
          className="quick-bar-editor-card"
          style={{ backgroundColor: "white" }}
          ref={cardRef}
        >
          {task.style?.cover && (
            <div
              className="pic"
              style={{
                backgroundColor: task.style ? task.style.bgColor : "none",
              }}
            >
              {isColor && (
                <div
                  className="card-cover"
                  style={{ backgroundColor: task.style.cover }}
                ></div>
              )}
              {!isColor && <img src={task.style.cover} alt="" />}
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
          left={btnsLeft}
          float={btnFloat}
          posTop={btnsTop}
          onTaskArchived={onTaskArchived}
        />
      </div>
    </div>
  );
}
