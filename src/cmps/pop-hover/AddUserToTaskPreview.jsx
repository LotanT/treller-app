import React, { useRef, useState, useEffect } from 'react'
import { taskService } from '../../services/task.service'
import { connect } from 'react-redux'

import { MdDone } from "react-icons/md";




export function AddUserToTaskPreview({ user, task, onToggleUserToTask }) {
    const [isOnTask, setIsOnTask] = useState(false)

    useEffect(() => {
        isUserOnTask()
    }, [task])


    const doOnToggleUserToTask = () => {
        onToggleUserToTask(user)
        isUserOnTask()
    }

    const isUserOnTask = () => {
        if (task.members) {
            console.log('task:' ,task)
            
            let bol = task.members.some((member) => (member._id === user._id))
            setIsOnTask(bol)
        }
    }

    return (
        <div className='user-task-container' onClick={doOnToggleUserToTask}>
            {(user) ? <img className='user-avatar' src={user.avatar} /> : <div className="user-profile"></div>}
            <span className='full-name'>{user.fullname}</span>
            {isOnTask && <MdDone className='label-done' />}
        </div>

    )
}
