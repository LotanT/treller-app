import { GroupPreview } from './GroupPreview';
import { CgClose } from 'react-icons/cg';
import { HiOutlinePlus } from 'react-icons/hi';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export function GroupList({
  groups,
  boardId,
  onAddTask,
  onEditGroupTitle,
  onAddGroup,
  onUpdateGroups
}) {
  // console.log(groups)
  const [isAddGroup, setAddGroup] = useState(false);
  const [groupTitle, setGroupTitle] = useState('');
  const [groupsOrder, setGroups] = useState(groups);

  const ToggleAddTask = () => {
    setAddGroup(!isAddGroup);
  };

  const handleGroupChange = (ev) => {
    setGroupTitle(ev.target.value);
  };

  const handleOnDragEng = (result) =>{
    const [groupToReorder] = groups.splice(result.source.index,1)
    groups.splice(result.destination.index,0,groupToReorder)
    onUpdateGroups(groups)
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEng}>
      <Droppable droppableId="groups">
        {(provided) => (
          <div className="group-list" {...provided.droppableProps} ref={provided.innerRef}>
            {groups.map((group,index) => (
                        <GroupPreview
                        key={group.id}
                        group={group}
                        boardId={boardId}
                        onAddTask={onAddTask}
                        onEditGroupTitle={onEditGroupTitle}
                        index={index}
                        />   
            ))}
            {provided.placeholder}
            <div className="group-container">
              <div className={`add-group ${isAddGroup}`}>
                {isAddGroup && (
                  <div className="form">
                    <input
                      type="text"
                      value={groupTitle}
                      onChange={handleGroupChange}
                    />
                    <div className="card-composer-control">
                      <div className="cc-control-section">
                        <span
                          className="control-section-add-btn"
                          onClick={() => onAddGroup(groupTitle)}
                        >
                          Add list
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
                {!isAddGroup && (
                  <div className="compose-task">
                    <div className="open-new-card" onClick={ToggleAddTask}>
                      <div className="compose-icon">
                        <HiOutlinePlus />
                      </div>
                      <span>Add another list</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
