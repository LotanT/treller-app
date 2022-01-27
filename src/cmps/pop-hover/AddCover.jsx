import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

// import { Link, NavLink } from 'react-router-dom'
import { taskService } from '../../services/task.service'
import { onEditBoard } from '../../store/board.actions'


import { MdDone } from "react-icons/md";
import { GrClose } from "react-icons/gr";



//MAP TO BOARD PREV

function _AddCover(props) {
    const [coverChoose, setCoverChoose] = useState(null)
    const [task, setTask] = useState(taskService.getTaskById(props.board, props.taskId))
    const [imgs, setImgs] = useState(taskService.getImgsFromTask(task))


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

    useEffect(() => {
        setCoverChoose((task.style.cover) ? task.style.cover : null)
    }, [])

    const onChooseCover = (cover) => {
        if (cover === coverChoose) {
            setCoverChoose('')
        } else setCoverChoose(cover);
    }

    const toggleCover = async () => {
        let updatedBoard = taskService.toggleCoverToTask(props.board, props.taskId, coverChoose)
        await props.onEditBoard(updatedBoard)
        props.toggleModal()

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
                            <div key={idx} className="pick-color-cover" style={{ backgroundColor: color }} onClick={() => onChooseCover(color)}>
                                {coverChoose === color && <MdDone style={{ color: 'white' }} className='label-done' />}
                            </div>
                        )}
                    </div>
                    {imgs && <>
                        <div className="add-title">Images</div>
                        <div className="imgs-palette-cover">
                            {imgs.map((img, idx) =>
                                <div key={idx} className={coverChoose !== img.url ? "pick-img-cover" : "pick-img-cover add-blue"} style={{ background: `url(${img.url})` }} onClick={() => onChooseCover(img.url)}>
                                    {/* {coverChoose === img.url && <MdDone style={{ color: 'white' }} className='label-done' />} */}
                                </div>
                            )}
                        </div></>}
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