import { TaskPreview } from '../TaskPreview';
import { HiOutlinePlus } from 'react-icons/hi';
import { RiKeyboardBoxLine } from 'react-icons/ri';
import { FiMoreHorizontal } from 'react-icons/fi';
import { CgClose } from 'react-icons/cg';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

export function GroupPreview({ group, boardId, onAddTask, onEditGroupTitle}) {

  const [isAddTask, setAddTask] = useState(false)
  // const [isEditGroupTitle, setEditGroupTitle] = useState(false)
  const [taskTitle, setTaskTitle] = useState('')
  const [gtoupTitle, setGroupTitle] = useState(group.title)

  useEffect(()=>{
      
      
      
  }, [])

  const ToggleAddTask = () =>{
    setAddTask(!isAddTask)
  }

  // const ToggleEditGroupTitle = () =>{
  //   setEditGroupTitle(!isEditGroupTitle)
  // }

  const handleCardChange = (ev) =>{
    setTaskTitle(ev.target.value)
  }

  const handleGroupChange = (ev) =>{
    setGroupTitle(ev.target.value)
  }

  const onAddTaskPreview = () =>{
    onAddTask(group.id,taskTitle)
    setAddTask(false)
    setTaskTitle('')
  }

 
  
  return (
    <div className="group-container">
      <div className="group">
        <div className="group-header">
          {/* {!isEditGroupTitle && <span onClick={ToggleEditGroupTitle}>{group.title}</span>} */}
          <textarea onBlur={()=>onEditGroupTitle(group.id,gtoupTitle)} onChange={handleGroupChange} dir='auto' value={gtoupTitle} ></textarea>
          <div className="group-action">
            <div className="group-action-icon">
              <FiMoreHorizontal/>
            </div>
          </div>
          </div>
        <div className="task-list">
          {group.tasks.map((task) => (
            <TaskPreview key={task.id} task={task} boardId={boardId} />
          ))}
          {isAddTask && <div className="card-composer">
            <div className="list-card-composer">
              <textarea onChange={handleCardChange} dir='auto' value={taskTitle} autoFocus placeholder='Enter a title for this card...' ></textarea>
            </div>
            <div className="card-composer-control">
              <div className="cc-control-section">
                <span className='control-section-add-btn' onClick={onAddTaskPreview}>Add card</span>
                <div className='control-close-icon' onClick={ToggleAddTask}><CgClose/></div>
              </div>
            </div>
          </div>}
        </div>
          {!isAddTask && <div className="compose-task">
            <div className="open-new-card" onClick={ToggleAddTask}>
              <div className="compose-icon"><HiOutlinePlus/></div>
              <span>Add a card</span>
            </div>
            <div className="task-template">
              <RiKeyboardBoxLine/>
            </div>
          </div>}
      </div>
    </div>
  );
}
