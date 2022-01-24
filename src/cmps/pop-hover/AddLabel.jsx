import React, { useRef, useState, useEffect } from 'react'
import { connect } from 'react-redux'

// import { Link, NavLink } from 'react-router-dom'
import ExitSvg from '../../assets/imgs/user-boards/exit.svg'
import { taskService } from '../../services/task.service'
import { loadBoard, onEditBoard } from '../../store/board.actions'
import { AddLabelsPreview } from './AddLabelsPreview'
import { AddLabelToBoard } from './AddLabelToBoard'


import { MdArrowBackIos } from "react-icons/md";
import { BiPencil } from "react-icons/bi";
import { AddLabelChange, AddLabelEdit } from './AddLabelEdit'



//MAP TO BOARD PREV

function _AddLabel(props) {
  const [CheckListTitle, setCheckListTitle] = useState('')
  const [task, setTask] = useState(taskService.getTaskById(props.board, props.taskId))
  const [label, setLabel] = useState('')
  const [BoardLabels, setBoardLabels] = useState(taskService.getLabels(props.board))

  //Toggle Pages
  const [openLabelPreview, setOpenLabelPreview] = useState(true)
  const [openCreateLabel, setOpenCreateLabel] = useState(false)
  const [openEditLabel, setOpenEditLabel] = useState(false)

  useEffect(() => {
    setTaskLocal()
  }, [])

  const setTaskLocal = () => {
    setTask(taskService.getTaskById(props.board, props.taskId))

  }

  const onToggleLabelToTask = async (labelId) => {
    let updatedBoard = taskService.toggleLabelToTask(props.board, props.taskId, labelId)
    await props.onEditBoard(updatedBoard)
    setTaskLocal()
  }

  const moveToCreateLabel = () => {
    setOpenLabelPreview(false);
    setOpenCreateLabel(true);
  }
  
  const goBackMain = ()=>{
    setOpenCreateLabel(false)
    setOpenEditLabel(false)
    
    setOpenLabelPreview(true)
  }
  
  const moveToEditLabel =(label)=>{
    setLabel(label)
    console.log(label);
    setOpenEditLabel(true)
    setOpenCreateLabel(false)
    setOpenLabelPreview(false)
    
  }
  
  const addLabel = async(color,title) => {
    let updatedBoard = taskService.addLabelToBoard(props.board, color, title)
    await props.onEditBoard(updatedBoard)
    goBackMain()
  }

  const updateLabel= async(updatedLabel)=>{
    let updatedBoard= await taskService.updateLabel(props.board,updatedLabel)
    await props.onEditBoard(updatedBoard)
    setBoardLabels(taskService.getLabels(props.board))
    goBackMain()
  }

  const removeLabel= async(labelToRemove)=>{
    let updatedBoard= await taskService.removeLabel(props.board,labelToRemove)
    await props.onEditBoard(updatedBoard)
    setBoardLabels(taskService.getLabels(props.board))
    goBackMain()
  }

  return (
    <div className="add-labels-pop">
        <img className='exit-svg' onClick={props.toggleModal} src={ExitSvg}></img>
        {openCreateLabel||openEditLabel&&<MdArrowBackIos className='go-back-label' onClick={goBackMain}/>}
      <div className="pop-content">
        <div className='add-labels-title'>Labels</div>

        {openCreateLabel && <AddLabelToBoard addLabel={addLabel}/>}

        {openEditLabel && <AddLabelEdit label={label} updateLabel={updateLabel} removeLabel={removeLabel}/>}




        {openLabelPreview &&
          <div className="add-label-preview">
            <div className="add-title">Labels</div>
            {BoardLabels &&
              BoardLabels.map((label,idx) =>
                <div className="label-container-pencil">
                <AddLabelsPreview
                  key={idx}
                  label={label}
                  task={task}
                  onToggleLabelToTask={onToggleLabelToTask}
                />
                <BiPencil className='pencil-icon' onClick={()=>moveToEditLabel(label)}/>
                </div>
              )}
            <button className='btn create-label' onClick={moveToCreateLabel}>Create New Label</button>
          </div>}


      </div>
    </div>
  )


}


function mapStateToProps(state) {
  return {
    board: state.boardModule.board
  }
}
const mapDispatchToProps = {
  onEditBoard,
}




export const AddLabel = connect(mapStateToProps, mapDispatchToProps)(_AddLabel)