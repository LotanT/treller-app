import { GroupPreview } from './GroupPreview';
import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { AddGroup } from './AddGroup';

export function GroupList({
  groups,
  boardId,
  onAddTask,
  onEditGroupTitle,
  onAddGroup,
  onUpdateGroups,
}) {
  // console.log(groups)
  const [groupsOrder, setGroups] = useState(groups);



  const handleOnDragEng = (result) => {
      if(!result.destination) return
      if(result.destination.droppableId === 'groups'){
          const [groupToReorder] = groups.splice(result.source.index, 1);
          groups.splice(result.destination.index, 0, groupToReorder);
        }else {
            let task = null;
            groups = groups.map(group=>{
                if(group.id === result.source.droppableId){
                    [task] = group.tasks.splice(result.source.index, 1)
                }
                return group
            })
            groups = groups.map(group=>{
                if(group.id === result.destination.droppableId){
                    group.tasks.splice(result.destination.index, 0, task)
                }
                return group
            })
        }
        onUpdateGroups(groups);
  };
 
// console.log(snapshot)
  return (
    <DragDropContext onDragEnd={handleOnDragEng}>
      <Droppable droppableId="groups" direction="horizontal" type='group'>
        {(provided, snapshot) => (
          <div
            className="group-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {groups.map((group, index) => (
              <GroupPreview
                key={group.id}
                group={group}
                boardId={boardId}
                onAddTask={onAddTask}
                onEditGroupTitle={onEditGroupTitle}
                groupIdx={index}
                snapshot={snapshot}
                />
                ))}
                {provided.placeholder}
        <AddGroup onAddGroup={onAddGroup}/>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
