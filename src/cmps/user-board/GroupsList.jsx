import { GroupPreview } from './GroupPreview';
import { CgClose } from 'react-icons/cg';
import { HiOutlinePlus } from 'react-icons/hi';
import {useState} from 'react'

export function GroupList({ groups, boardId, onAddTask, onEditGroupTitle }) {
  // console.log(groups)
  const [isAddGroup, setAddGroup] = useState(false)
  const [groupTitle, setGroupTitle] = useState('')

  const ToggleAddTask = () =>{
    setAddGroup(!isAddGroup)
  }

  const handleGroupChange = (ev) =>{
    setGroupTitle(ev.target.value)
  }

//   const onAddGroup = () =>{
//     onAddTask(taskTitle)
//     setAddTask(false)
//     setTaskTitle('')
//   }

  return (
    <div className="group-list">
      {groups.map((group) => (
        <GroupPreview
          key={group.id}
          group={group}
          boardId={boardId}
          onAddTask={onAddTask}
          onEditGroupTitle={onEditGroupTitle}
        />
      ))}
      <div className="group-container">
        <div className="add-group">
          {isAddGroup &&<div className="form">
            <input type="text" value={groupTitle} onChange={handleGroupChange}/>
            <div className="card-composer-control">
              <div className="cc-control-section">
                <span className="control-section-add-btn">Add list</span>
                <div className="control-close-icon">
                  <CgClose />
                </div>
              </div>
            </div>
          </div>}
          {!isAddGroup && <div className="compose-task">
            <div className="open-new-card" onClick={ToggleAddTask}>
              <div className="compose-icon">
                <HiOutlinePlus />
              </div>
              <span>Add another list</span>
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
}
