import { CgClose } from 'react-icons/cg';
import { BsStar } from 'react-icons/bs';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { CgDetailsMore } from 'react-icons/cg';
import { BiMessageRounded } from 'react-icons/bi';
import { BsCheck2Square } from 'react-icons/bs';
import { MdAttachFile } from 'react-icons/md';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';
import { VscEdit } from 'react-icons/vsc';
import { Draggable } from 'react-beautiful-dnd';
import {QuickBarBtn} from './QuickBarBtn'

export function QuickBar({
  task,
  handleCardChange,
  taskTitle,
  cardPos,
  toggleIsQuickEditOpen,
  quickEditRef,
  duDateStatus,
  toggleTaskDone,
  getDateTemplate,
  checkIsListDone,
  getCheckListCount,
}) {
  const top = cardPos.top;
  const left = cardPos.right - 250;
  console.log(cardPos);
  return (
    <div
      className="quick-bar-editor"
      onClick={toggleIsQuickEditOpen}
      ref={quickEditRef}
    >
      <div className="quick-bar-exit">
        <BsStar />
      </div>
      <div
        className="quick-edit-card-container"
        style={{ top: top, left: left, backgroundColor: 'white' }}
      >
        <div
          className="quick-bar-editor-card"
          style={{ backgroundColor: 'white' }}
        >
          <div className="labels" style={{ backgroundColor: '#ffffff' }}>
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
                onChange={handleCardChange}
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
                    onClick={() => toggleTaskDone(task)}
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
        <div className="card-composer-control" style={{ display: 'block' }}>
          <div className="cc-control-section">
            <span
              className="control-section-add-btn"
              // onClick={onAddTaskPreview}
            >
              Save
            </span>
          </div>
        </div>
        <QuickBarBtn/>
      </div>
    </div>
  );
}
