import React, { useState } from 'react'

import { GrClose } from "react-icons/gr";


//MAP TO BOARD PREV

export function AddCheckList({ onCreateNewTaskList, toggleModal }) {
  const [CheckListTitle, setCheckListTitle] = useState('')



  const onCreateNewTaskListAdd = () => {
    onCreateNewTaskList(CheckListTitle)
    toggleModal()
  }

  return (
    <div className="add-check-list-pop">
        <div className="pop-content">
      <div className="header-container">
      <GrClose stroke="#0079bf" fill="#0079bf" className='exit-svg' onClick={toggleModal} />
          <div className='add-list-title'>Add checklist</div>
        </div>
        <div className="add-title">Title:</div>
        <input type="text" required="" aria-required="true" value={CheckListTitle} onChange={e => setCheckListTitle(e.target.value)}></input>
        <button className='btn create-list' onClick={onCreateNewTaskListAdd}>Create</button>
      </div>
    </div>
  )


}

