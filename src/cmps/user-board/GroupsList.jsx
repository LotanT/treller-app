import { useState, useEffect } from 'react';
import { GroupPreview } from './GroupPreview';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { AddGroup } from './AddGroup';

export function GroupList({
  groupsFromBoard,
  boardId,
  onAddTask,
  onEditGroupTitle,
  onAddGroup,
  onUpdateGroups,
  toggleOpenLabel,
  isLabelOpen,
  onUpdateTask,
}) {

  const queryAttr = 'data-rbd-drag-handle-draggable-id';
  const [placeholderProps, setPlaceholderProps] = useState({});
  const [groups, setGroups] = useState(groupsFromBoard);
  // const [zIndex, setzIndex] = useState(0);

  useEffect(() => {
    setGroups(groupsFromBoard);
  }, [groupsFromBoard]);
  // useEffect(() => {
  //   document.addEventListener('keypress', EnterFeyPressed);
  //   return  document.removeEventListener('mousedown',EnterFeyPressed)
  // }, []);

  const EnterFeyPressed = () =>{
    console.log('hi')
  }


  const setGroupIsArchive = (groupToUpdate) => {
    const groupsToUpdate = groups.map((group) =>
      group.id === groupToUpdate.id ? groupToUpdate : group
    );
    onUpdateGroups(groupsToUpdate)
  };

  const handleOnDragEng = (result) => {
    setPlaceholderProps({});
    if (!result.destination) return;
    let groupsToUpdate = groups;
    if (result.destination.droppableId === 'groups') {
      const [groupToReorder] = groupsToUpdate.splice(result.source.index, 1);
      groupsToUpdate.splice(result.destination.index, 0, groupToReorder);
    } else {
      let task = null;
      groupsToUpdate = groupsToUpdate.map((group) => {
        if (group.id === result.source.droppableId) {
          [task] = group.tasks.splice(result.source.index, 1);
        }
        return group;
      });
      groupsToUpdate = groupsToUpdate.map((group) => {
        if (group.id === result.destination.droppableId) {
          group.tasks.splice(result.destination.index, 0, task);
        }
        return group;
      });
    }
    onUpdateGroups(groupsToUpdate);
  };

  const getDraggedDom = (draggableId) => {
    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    return draggedDOM;
  };

  const handleDragStart = (event) => {
    console.log(event);
    const draggedDOM = getDraggedDom(event.draggableId);
    if (!draggedDOM) {
      return;
    }

    const { clientHeight, clientWidth } = draggedDOM;
    const sourceIndex = event.source.index;
    var clientY =
      parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
      [...draggedDOM.parentNode.children]
        .slice(0, sourceIndex)
        .reduce((total, curr) => {
          const style = curr.currentStyle || window.getComputedStyle(curr);
          const marginBottom = parseFloat(style.marginBottom);
          return total + curr.clientHeight + marginBottom;
        }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(
        window.getComputedStyle(draggedDOM.parentNode).paddingLeft
      ),
    });
  };

  //   const handleDragEnd = (result) => {
  //     setPlaceholderProps({});
  //   };

  const handleDragUpdate = (event) => {
    if (!event.destination) {
      return;
    }

    const draggedDOM = getDraggedDom(event.draggableId);

    if (!draggedDOM) {
      return;
    }

    const { clientHeight, clientWidth } = draggedDOM;
    const destinationIndex = event.destination.index;
    const sourceIndex = event.source.index;

    const childrenArray = [...draggedDOM.parentNode.children];
    const movedItem = childrenArray[sourceIndex];
    childrenArray.splice(sourceIndex, 1);

    const updatedArray = [
      ...childrenArray.slice(0, destinationIndex),
      movedItem,
      ...childrenArray.slice(destinationIndex + 1),
    ];

    var clientY =
      parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
      updatedArray.slice(0, destinationIndex).reduce((total, curr) => {
        const style = curr.currentStyle || window.getComputedStyle(curr);
        const marginBottom = parseFloat(style.marginBottom);
        return total + curr.clientHeight + marginBottom;
      }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(
        window.getComputedStyle(draggedDOM.parentNode).paddingLeft
      ),
    });
  };
  const groupsToRender = groups.filter(group=>!group.isArchive)
  return (
    <DragDropContext
      onDragEnd={handleOnDragEng}
      // onDragStart={handleDragStart}
      // onDragUpdate={handleDragUpdate}
    >
      <Droppable droppableId="groups" direction="horizontal" type="group">
        {(provided, snapshot) => (
          <div
            className="group-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {groupsToRender.map((group, index) => (
              <GroupPreview
                key={group.id}
                group={group}
                boardId={boardId}
                onAddTask={onAddTask}
                onEditGroupTitle={onEditGroupTitle}
                groupIdx={index}
                snapshot={snapshot}
                getDraggedDom={getDraggedDom}
                placeholderProps={placeholderProps}
                toggleOpenLabel={toggleOpenLabel}
                isLabelOpen={isLabelOpen}
                onUpdateTask={onUpdateTask}
                setGroupIsArchive={setGroupIsArchive}
              />
            ))}
            {provided.placeholder}
            <AddGroup onAddGroup={onAddGroup} />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
