import React, { useRef, useState, useEffect } from 'react'
import { connect } from 'react-redux'

// import { Link, NavLink } from 'react-router-dom'
import ExitSvg from '../../assets/imgs/user-boards/exit.svg'
import { onAddBoard } from '../../store/board.actions'


//MAP TO BOARD PREV

function _AddBoard({ isOpenModal, closeModal,onAddBoard }) {
  const [boardTitle, setBoardTitle] = useState('')

  const inputModal = useRef(true)

  useEffect(() => {
    if (isOpenModal) {
      inputModal.current.classList.remove('hidden')
    } else if (!isOpenModal) inputModal.current.classList.add('hidden')

  }, [isOpenModal])

  const createNewBoard = () => {
    if (boardTitle){
      onAddBoard(boardTitle)
      closeModal()
    }
    else{
      return
    }
  }


  return (
    <div ref={inputModal} className="add-board-pop">
      <div className='add-board-title'>Create board</div>
      <div className="add-title">Board Title:</div>
      <input type="text" required="" aria-required="true" value={boardTitle} onChange={e=> setBoardTitle(e.target.value)}></input>
      <button className='btn create-board'onClick={createNewBoard}>Create</button>
      <img className='exit-svg' onClick={closeModal} src={ExitSvg}></img>
    </div>
  )


}

function mapStateToProps() {
  return {

  }
}

const mapDispatchToProps = {
  onAddBoard

}
export const AddBoard = connect(mapStateToProps, mapDispatchToProps)(_AddBoard)