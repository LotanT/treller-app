import React, { useRef, useState, useEffect } from 'react'
import { connect } from 'react-redux'

// import { Link, NavLink } from 'react-router-dom'
import ExitSvg from '../../assets/imgs/user-boards/exit.svg'
import { onAddBoard } from '../../store/board.actions'


//MAP TO BOARD PREV

export function AddCheckList({onCreateNewTaskList, toggleModal }) {
  const [CheckListTitle, setCheckListTitle] = useState('')


  
  const onCreateNewTaskListAdd = () =>{
    onCreateNewTaskList(CheckListTitle)
    toggleModal()
  }

  return (
    <div  className="add-check-list-pop">
      <div className='add-list-title'>Add checklist</div>
      <div className="add-title">Title:</div>
      <input type="text" required="" aria-required="true" value={CheckListTitle} onChange={e=> setCheckListTitle(e.target.value)}></input>
      <button className='btn create-list' onClick={onCreateNewTaskListAdd}>Create</button>
      <img className='exit-svg' onClick={toggleModal} src={ExitSvg}></img>
    </div>
  )


}

