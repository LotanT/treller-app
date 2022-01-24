import React, { useState } from 'react'

import ExitSvg from '../../assets/imgs/user-boards/exit.svg'


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
        <div className='add-list-title'>Add checklist</div>
        <div className="add-title">Title:</div>
        <input type="text" required="" aria-required="true" value={CheckListTitle} onChange={e => setCheckListTitle(e.target.value)}></input>
        <button className='btn create-list' onClick={onCreateNewTaskListAdd}>Create</button>
        <img className='exit-svg' onClick={toggleModal} src={ExitSvg}></img>
      </div>
    </div>
  )


}

