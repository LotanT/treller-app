import React from 'react'
import MainLogo from '../../assets/imgs/header/main-logo.png'
import { BoardPreview } from './BoardPreview'
import { CreateNewBoard } from './CreateNewBoard'
// import { Link, NavLink } from 'react-router-dom'


//MAP TO BOARD PREV

export function BoardList(props) {
  const { boards, onEditBoard } = props

  return (
    <React.Fragment>
      {boards &&
        boards.map((board, idx) => (
          <BoardPreview board={board} key={idx} onEditBoard={onEditBoard} />
        ))}
    </React.Fragment>

  )
}



