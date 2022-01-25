import React, { useRef, useState } from 'react'
import { Link } from "react-router-dom";
import { AddBoard } from "../pop-hover/AddBoard";



export function CreateNewBoard({ openModal,closeModal, isOpenModal}) {

    return (
        <div className="new-board-preview" >
            <div className='board-details' onClick={openModal}>
                <h2 className='board-title'>Create new board</h2>
            </div>
            <AddBoard closeModal={closeModal} isOpenModal={isOpenModal} />
        </div>

    )
}

