import React from 'react'
import MainLogo from '../../assets/imgs/header/main-logo.png'
import { BoardPreview } from './BoardPreview'
// import { Link, NavLink } from 'react-router-dom'


//MAP TO BOARD PREV

export function BoardList() {

    return (
        <div className="boards-list">
            <BoardPreview/>
        </div>
    )
}



