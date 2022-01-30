import { TaskPreview } from "./TaskPreview";
import { HiOutlinePlus } from "react-icons/hi";
import { RiKeyboardBoxLine } from "react-icons/ri";
import { FiMoreHorizontal } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { isEmpty } from "lodash";

export function GroupPreview({
  group,
  boardId,
  onAddTask,
  onEditGroupTitle,
  groupIdx,
  placeholderProps,
  toggleOpenLabel,
  isLabelOpen,
  onUpdateTask,
  setGroupIsArchive,
}) {
  // group.tasks = group.tasks.filter((task) => !task.isArchive);
  const [isEditGroupTitle, setIsEditGroupTitle] = useState(false);
  const [isAddTask, setAddTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [gtoupTitle, setGroupTitle] = useState(group.title);

  const editGroupTitleRef = React.createRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleDeyEnter);
    return document.removeEventListener("mousedown", handleDeyEnter);
  }, []);

  const handleDeyEnter = (e) => {
    // console.log(e)
    if (editGroupTitleRef?.current?.contains(e.target) && e.key === "Enter") {
      updateGroupTitle();
    }
  };

  const updateGroupTitle = () => {
    ToggleEditGroupTitle();
    onEditGroupTitle(group.id, gtoupTitle);
  };

  const ToggleAddTask = () => {
    setAddTask(!isAddTask);
  };

  const ToggleEditGroupTitle = () => {
    setIsEditGroupTitle(!isEditGroupTitle);
  };

  const handleCardChange = (ev) => {
    setTaskTitle(ev.target.value);
  };

  const handleGroupChange = (ev) => {
    setGroupTitle(ev.target.value);
  };

  const onAddTaskPreview = () => {
    onAddTask(group.id, taskTitle);
    setAddTask(false);
    setTaskTitle("");
  };

  const setIsArchive = () => {
    group.isArchive = !group.isArchive;
    setGroupIsArchive(group);
  };
  const taskToRender = group.tasks.filter((task) => !task.isArchive);
  return (
    <Draggable key={group.id} draggableId={group.id} index={groupIdx}>
      {(provided) => (
        <div
          className="group"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="group-header">
            {!isEditGroupTitle && (
              <span onClick={ToggleEditGroupTitle}>{gtoupTitle}</span>
            )}
            {isEditGroupTitle && (
              <input
                type="text"
                onBlur={updateGroupTitle}
                onChange={handleGroupChange}
                dir="auto"
                value={gtoupTitle}
                ref={editGroupTitleRef}
                autoFocus
              ></input>
            )}
            <div className="group-action">
              <div className="group-action-icon" onClick={setIsArchive}>
                <FiMoreHorizontal />
              </div>
            </div>
          </div>
          {/* <DragDropContext > */}
          <Droppable droppableId={group.id}>
            {(provided, snapshot) => (
              <div
                className="task-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
                // style={{zIndex: listZIndex}}
              >
                {taskToRender &&
                  taskToRender.map((task, index) => (
                    <TaskPreview
                      key={task.id}
                      task={task}
                      boardId={boardId}
                      index={index}
                      toggleOpenLabel={toggleOpenLabel}
                      isLabelOpen={isLabelOpen}
                      onUpdateTask={onUpdateTask}
                      handleCardChange={handleCardChange}
                    />
                  ))}
                {provided.placeholder}
                {/* {!isEmpty(placeholderProps) && snapshot.isDraggingOver && (
              <div
                className="placeholder"
                style={{
                  top: placeholderProps.clientY,
                  left: placeholderProps.clientX,
                  height: placeholderProps.clientHeight,
                  width: placeholderProps.clientWidth
                }}
              />
            )} */}
                {isAddTask && (
                  <div className="card-composer">
                    <div className="list-card-composer">
                      <textarea
                        onChange={handleCardChange}
                        dir="auto"
                        value={taskTitle}
                        autoFocus
                        placeholder="Enter a title for this card..."
                      ></textarea>
                    </div>
                    <div className="card-composer-control">
                      <div className="cc-control-section">
                        <span
                          className="control-section-add-btn"
                          onClick={onAddTaskPreview}
                        >
                          Add card
                        </span>
                        <div
                          className="control-close-icon"
                          onClick={ToggleAddTask}
                        >
                          <CgClose />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Droppable>
          {provided.placeholder}
          {/* {!isEmpty(placeholderProps) && snapshot.isDraggingOver && (
              <div
                className="placeholder"
                style={{
                  top: placeholderProps.clientY,
                  left: placeholderProps.clientX,
                  height: placeholderProps.clientHeight,
                  width: placeholderProps.clientWidth
                }}
              />
            )} */}
          {!isAddTask && (
            <div className="compose-task">
              <div className="open-new-card" onClick={ToggleAddTask}>
                <div className="compose-icon">
                  <HiOutlinePlus />
                </div>
                <span>Add a card</span>
              </div>
              <div className="task-template">
                <RiKeyboardBoxLine />
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}
