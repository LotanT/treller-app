import React, { useRef, useState, useEffect } from 'react'
import { connect } from 'react-redux'

// import { Link, NavLink } from 'react-router-dom'
import { taskService } from '../../services/task.service'
import { userService } from '../../services/user.service'
import {  onEditBoard } from '../../store/board.actions'
import { AddUserToTaskPreview } from './AddUserToTaskPreview'



import { MdArrowBackIos } from "react-icons/md";
import { BiPencil } from "react-icons/bi";
import { GrClose } from "react-icons/gr";



//MAP TO BOARD PREV

function _AddUserToBoard(props) {
    const [task, setTask] = useState(taskService.getTaskById(props.board, props.taskId))
    const [UserAttached, setUserAttached] = useState([])



    useEffect(() => {
        console.log(props);
        setTaskLocal()
        setUsers()
    }, [props.board])

    const setTaskLocal = () => {
        setTask(taskService.getTaskById(props.board, props.taskId))

    }

    const setUsers = async() => {
            setUserAttached(await userService.getUsers())
    }
    
  const onToggleUserToBoard = async (user) => {
    let updatedBoard = taskService.toggleUserToBoard(props.board, user)
    await props.onEditBoard(updatedBoard)
    setTaskLocal()
  }


    return (
        <div className="add-labels-pop">
            <div className="pop-content">
                <div className="header-container">
                    <GrClose stroke="#0079bf" fill="#0079bf" className='exit-svg' onClick={props.toggleModal} />
                    <div className='add-labels-title'>Members</div>
                </div>



                <div className="add-label-preview">
                    <div className="add-title">Board members</div>
                    {UserAttached.length>0 &&
                        UserAttached.map((user) =>
                            <div key={user._id} className="label-container-pencil">
                                <AddUserToTaskPreview
                                    user={user}
                                    task={task}
                                    onToggleUserToTask={onToggleUserToBoard}
                                />
                                {/* <BiPencil className='pencil-icon' onClick={() => moveToEditLabel(user)} /> */}
                            </div>
                        )}
                </div>


            </div>
        </div>
    )


}


function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        user: state.userModule.user

    }
}
const mapDispatchToProps = {
    onEditBoard,
    
}




export const AddUserToBoard = connect(mapStateToProps, mapDispatchToProps)(_AddUserToBoard)