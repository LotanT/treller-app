import React, { useRef, useState, useEffect } from 'react'
import { connect } from 'react-redux'

// import { Link, NavLink } from 'react-router-dom'
import { taskService } from '../../services/task.service'
import { loadBoard, onEditBoard } from '../../store/board.actions'


import { MdDone } from "react-icons/md";
import { GrClose } from "react-icons/gr";



//MAP TO BOARD PREV

function _AddAttachment(props) {
    const [colorChoose, setColorChoose] = useState(null)

  
    const onChooseColor = (color) => {
        if (color === colorChoose) {
            setColorChoose('')
        } else setColorChoose(color);
    }

    const toggleCover = async () => {
        let updatedBoard = taskService.toggleCoverToTask(props.board, props.taskId, colorChoose)
        await props.onEditBoard(updatedBoard)
        props.toggleModal()

    }

    return (
        <div className="add-labels-pop">
            <div className="pop-content">
                <div className="header-container">
                    <GrClose stroke="#0079bf" fill="#0079bf" className='exit-svg' onClick={props.toggleModal} />
                    <div className='add-labels-title'>Attachment</div>
                </div>



                <div className="add-label-preview">
                    <div className="add-title">Attachment</div>
                    <div className="color-palette-cover">

                    </div>
                    <button className='btn create-label' >Save</button>
                </div>


            </div>
        </div >
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




export const AddAttachment = connect(mapStateToProps, mapDispatchToProps)(_AddAttachment)