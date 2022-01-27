import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { utilService } from '../../services/util.service'
import { taskService } from '../../services/task.service'
import { onEditBoard } from '../../store/board.actions'
import { cloudinaryService } from '../../services/cloudinary-service'

import { TaskAttachmentsPreview } from '../task-edit/TaskAttachmentPreview'
import { ImAttachment } from "react-icons/im";



export function TaskAttachments(props) {

    

    return (
        <>
            <div className="description">
                <ImAttachment style={{ fill: "#1d3663" }} />
                <h3>Attachments</h3>
            </div>

            <div className="attach-container">

                <div className="attach-list">
                    {props.task.attachments && props.task.attachments.map((attach) => 
                        <TaskAttachmentsPreview key={attach.id} task={props.task} attach={attach} />
                    )}
                </div>
            </div>
        </>
    )


}
