import React, { useRef, useState, useEffect } from 'react'
import { connect } from 'react-redux'

// import { Link, NavLink } from 'react-router-dom'
import { taskService } from '../../services/task.service'
import { loadBoard, onEditBoard } from '../../store/board.actions'


import { MdDone } from "react-icons/md";
import { GrClose } from "react-icons/gr";



//MAP TO BOARD PREV

function _AddCover(props) {
    const [colorChoose, setColorChoose] = useState(null)


    const colors = [
        '#61bd4f',
        '#f2d600',
        '#ff9e1a',
        '#eb5a46',
        '#c277e0',
        '#0279bf',
        '#52e898',
        '#ff78cb',
        '#334563',
        '#b3bac5',
    ]


  
    const onChooseColor = (color) => {
        if (color === colorChoose) {
            setColorChoose('')
        } else setColorChoose(color);
    }

    const toggleCover = async () => {
        let updatedBoard = taskService.toggleCoverToTask(props.board, props.taskId, colorChoose)
        await props.onEditBoard(updatedBoard)
    }

    return (
        <div className="add-labels-pop">
            <div className="pop-content">
                <div className="header-container">
                    <GrClose stroke="#0079bf" fill="#0079bf" className='exit-svg' onClick={props.toggleModal} />
                    <div className='add-labels-title'>Cover</div>
                </div>



                <div className="add-label-preview">
                    <div className="add-title">Colors</div>
                    <div className="color-palette-cover">
                        {colors.map((color, idx) =>
                            <div key={idx} className="pick-color-cover" style={{ backgroundColor: color }} onClick={() => onChooseColor(color)}>
                                {colorChoose === color && <MdDone style={{ color: 'white' }} className='label-done' />}
                            </div>
                        )}
                    </div>
                    <button className='btn create-label' onClick={toggleCover}>Save Cover</button>
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




export const AddCover = connect(mapStateToProps, mapDispatchToProps)(_AddCover)