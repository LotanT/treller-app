import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { QuickBar } from './QuickBar';

import { AiOutlineClockCircle } from 'react-icons/ai';
import { ImAttachment } from 'react-icons/im';
import { CgDetailsMore } from 'react-icons/cg';
import { BiMessageRounded } from 'react-icons/bi';
import { BsCheck2Square } from 'react-icons/bs';
import { MdAttachFile } from 'react-icons/md';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';
import { MdCheckBox } from 'react-icons/md';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { VscEdit } from 'react-icons/vsc';
import { Draggable } from 'react-beautiful-dnd';

export function TaskPreview({
  task,
  boardId,
  index,
  toggleOpenLabel,
  isLabelOpen,
  onUpdateTask,
}) {
  let history = useHistory();

  const labelsRef = React.createRef();
  const duDateRef = React.createRef();
  const quickEditIconRef = React.createRef();
  const quickEditRef = React.createRef();

  const [isQuickEditOpen, setQuickEditOpen] = useState(false);
  const [cardPos, setClickPos] = useState({});

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return document.removeEventListener('mousedown', handleClick);
  }, []);

  const toggleIsQuickEditOpen = () => {
    setQuickEditOpen(!isQuickEditOpen);
  };

  const handleClick = (e, isDragging) => {
    if (isQuickEditOpen) return;
    let { right, top } = e.target.getBoundingClientRect();
    setClickPos({ right: right - 252, top: top - 5 });
    if (
      labelsRef?.current?.contains(e.target) ||
      duDateRef?.current?.contains(e.target) ||
      quickEditIconRef?.current?.contains(e.target) ||
      quickEditRef?.current?.contains(e.target)
    ) {
      return;
    }
    openEditCard();
  };

  const openEditCard = () => {
    history.push(`/${boardId}/${task.id}`);
  };

  const getDragStyle = (isDragging, draggableStyle) => ({
    // transform: `{rotate(90deg)}`,
    // zIndex: isDragging? '50' : '0',
    // backgroundColor: isDragging ? 'blue' : 'white',

    ...draggableStyle,
  });

  const getDateTemplate = () => {
    const month_names_short = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const duDate = new Date(task.dueDate);
    return `${month_names_short[duDate.getMonth()]} ${duDate.getDate()}`;
  };

  let checkIsListDone;
  const getCheckListCount = () => {
    let checkListCount = task.checklists.map(
      (checklist) => checklist.todos.length
    );
    checkListCount = checkListCount.reduce((a, b) => a + b, 0);
    let checkListDone = task.checklists.map(
      (checklist) => checklist.todos.filter((todo) => todo.isDone).length
    );
    checkListDone = checkListDone.reduce((a, b) => a + b, 0);
    if (checkListDone === checkListCount) checkIsListDone = 'complete';
    return `${checkListDone}/${checkListCount}`;
  };

  const toggleTaskDone = () => {
    task.isDone = !task.isDone;
    onUpdateTask(task);
  };

  const updateTaskTitle = (title) => {
    task.title = title;
    toggleIsQuickEditOpen();
    onUpdateTask(task);
  };

  const onTaskArchived = () => {
    task.isArchive = true;
    onUpdateTask(task);
  };

  const getDueDateStyle = () => {
    if (task.isDone) return;
    const day = 1000 * 60 * 60 * 24;
    let style = {};
    if (Date.now() + 3 * day > task.dueDate) {
      style = { backgroundColor: '#F2D600', color: 'white' };
    }
    if (Date.now() > task.dueDate) {
      style = { backgroundColor: '#EB5A46', color: 'white' };
    }
    return style;
  };

  let isColor;
  if (task.style.cover) {
    isColor = task.style.cover.startsWith('#') ? true : false;
  }

  //  const index = getCounter(true)
  //  console.log(index)

  const duDateStatus = task.isDone;
  if (!duDateStatus && task.duDate > Date.now()) duDateStatus = 'late';

  const openQuickEditor = () => {};
  // console.log(task.checklists)
  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          onClick={handleClick}
          className="card"
          to={`/${boardId}/${task.id}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={getDragStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <div className="card-hover">
            <div
              className="card-edit-icon"
              ref={quickEditIconRef}
              onClick={toggleIsQuickEditOpen}
            >
              <VscEdit />
            </div>
          </div>

          {task.style?.cover && (
            <div
              className="pic"
              style={{
                backgroundColor: task.style ? task.style.bgColor : 'none',
              }}
            >
              {isColor && (
                <div
                  className="card-cover"
                  style={{ backgroundColor: task.style.cover }}
                ></div>
              )}
              {!isColor && (
                <div
                  className="img-cover"
                  style={{ backgroundImage: `url(${task.style.cover})` }}
                  alt=""
                />
              )}
            </div>
          )}
          <div className="card-details">
            <div className="labels" ref={labelsRef}>
              {task.labels &&
                task.labels.map((label) => {
                  return (
                    <span
                      key={label.id}
                      className={`card-label ${isLabelOpen}`}
                      style={{ backgroundColor: label.color }}
                      onClick={toggleOpenLabel}
                    >
                      <span className={`label-title ${isLabelOpen}`}>
                        {label.title}
                      </span>
                    </span>
                  );
                })}
            </div>
            <div>{task.title}</div>
            <div className="icons-container">
              <div className="card-icons">
                {task.dueDate && (
                  <div
                    className={`icon du-date-${duDateStatus}`}
                    style={getDueDateStyle()}
                  >
                    <div
                      className={`du-date ${task.isDone}`}
                      onClick={toggleTaskDone}
                      ref={duDateRef}
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
                {task.checklists && Boolean(task.checklists.length) && (
                  <div className={`icon checklist-${checkIsListDone}`}>
                    <BsCheck2Square className="svg" />
                    <span>{getCheckListCount()}</span>
                  </div>
                )}
                {task.attachments && (
                  <div className="icon">
                    <ImAttachment className="svg attachment" />
                    <span>{task.attachments.length}</span>
                  </div>
                )}
              </div>
            </div>
            {task.members && (
              <div className="task-members">
                {task.members.map((member) => {
                  return (
                    <div key={member._id} className="member">
                      <img src={member.avatar} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {isQuickEditOpen && (
            <QuickBar
              task={task}
              cardPos={cardPos}
              toggleIsQuickEditOpen={toggleIsQuickEditOpen}
              quickEditRef={quickEditRef}
              duDateStatus={duDateStatus}
              toggleTaskDone={toggleTaskDone}
              getDateTemplate={getDateTemplate}
              checkIsListDone={checkIsListDone}
              getCheckListCount={getCheckListCount}
              isColor={isColor}
              updateTaskTitle={updateTaskTitle}
              openEditCard={openEditCard}
              onTaskArchived={onTaskArchived}
            />
          )}
        </div>
      )}
    </Draggable>
  );
}
