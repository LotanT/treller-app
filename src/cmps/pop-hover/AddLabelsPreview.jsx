import React, { useRef, useState, useEffect } from 'react'
import { taskService } from '../../services/task.service'
import { connect } from 'react-redux'

import { MdDone } from "react-icons/md";




export function AddLabelsPreview({ label, task, onToggleLabelToTask }) {
    const [isOnTask, setIsOnTask] = useState(false)

    useEffect(() => {
        isLabelOnTask()
    }, [])


    const doOnToggleLabelToTask = () => {
        onToggleLabelToTask(label.id)
        isLabelOnTask()
    }

    const isLabelOnTask = () => {
        console.log(task.labelIds, label.id)
        if (task.labelIds) {
            let bol = task.labelIds.some((labelId) => (labelId === label.id))
            console.log('bol:' ,bol)
            
            setIsOnTask(bol)
        }
    }

    return (
        <div className='label-container' style={{ backgroundColor: label.color }} onClick={doOnToggleLabelToTask}>
            {label.title}
            {isOnTask && <MdDone className='label-done'/>}
        </div>

    )
}
