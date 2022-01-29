import React, { useState, useEffect } from 'react'

import { MdDone } from "react-icons/md";




export function AddLabelsPreview({ label, task, onToggleLabelToTask }) {
    const [isOnTask, setIsOnTask] = useState(false)

    useEffect(() => {
        isLabelOnTask()
    }, [task])


    const doOnToggleLabelToTask = () => {
        onToggleLabelToTask(label)
        isLabelOnTask()
    }

    const isLabelOnTask = () => {
        if (task.labels) {
            let bol = task.labels.some((taskLabel) => (taskLabel.id === label.id))
            setIsOnTask(bol)
        }
    }

    return (
        <div className='label-container' style={{ backgroundColor: label.color }} onClick={doOnToggleLabelToTask}>
            {label.title}
            {isOnTask && <MdDone className='label-done' />}
        </div>

    )
}
