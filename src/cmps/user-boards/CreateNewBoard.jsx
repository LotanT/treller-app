import React, { useRef, useState } from 'react'
import { Link } from "react-router-dom";



export function CreateNewBoard({openModal}) {



    return (
            <div className="new-board-preview" onClick={openModal}>
                <div className='board-details'>
                    <h2 className='board-title'>Create new board</h2>
                </div>

            </div>
        
    )
}

