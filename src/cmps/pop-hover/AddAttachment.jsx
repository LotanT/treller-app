import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { utilService } from '../../services/util.service'
import { taskService } from '../../services/task.service'
import { onEditBoard } from '../../store/board.actions'
import { cloudinaryService } from '../../services/cloudinary-service'

// import { fileTypeFromFile } from 'file-type';


import { GrClose } from "react-icons/gr";




function _AddAttachment(props) {
    const [currTask, setCurrTask] = useState(taskService.getTaskById(props.board, props.taskId))
    const [attachTitle, setAttachTitle] = useState('')
    const [attachSrc, setAttachSrc] = useState('')

    useEffect(() => {
        setCurrTask(taskService.getTaskById(props.board, props.taskId))
    }, [])


    const uploadFile = async (ev) => {
        try {
            const res = await cloudinaryService.doUploadFile(ev)
            const attach = { 
                name: res.original_filename,
                id: res.asset_id,
                createdAt: Date.now(), 
                url: res.secure_url,
                isImg: taskService.isImg(res.secure_url)

            }
            currTask.attachments = (currTask.attachments) ? [...currTask.attachments, attach] : [attach]
            setCurrTask(currTask)
            updateBoard()
        }
        catch (err) {
            console.log('error while connect server', err)
        }
    }
    
    const onAttachmentClick = async () => {
        if (attachSrc) {
            const attach = {
                id: utilService.makeId(),
                name: (attachTitle) ? attachTitle : attachSrc,
                url: (attachSrc.startsWith('http' || 'https')) ? attachSrc : 'https://' + attachSrc,
                createdAt: Date.now(),
                isWeb: true,
                isImg: taskService.isImg(attachSrc)
            }
            // currTask.attachments = (currTask.attachments) ? [...currTask.attachments, attach] : [attach]
            setCurrTask(currTask.attachments = (currTask.attachments) ? [...currTask.attachments, attach] : [attach])
            console.log(currTask);
            updateBoard()
        }
    }
    const updateBoard = async () => {
        const updateBoard = taskService.updateTask(props.board, currTask)
        await props.onEditBoard(updateBoard)
        props.toggleModal()
    }


    return (
        <div className="add-labels-pop">
            <div className="pop-content">
                <div className="header-container">
                    <GrClose stroke="#0079bf" fill="#0079bf" className='exit-svg' onClick={props.toggleModal} />
                    <div className='add-labels-title'>Attachment</div>
                </div>

                <div className="upload-preview" >
                    <label htmlFor="file-upload">Computer</label>
                    <input type="file" onChange={uploadFile} accept="img/*" id="file-upload" />
                </div>



                <div className="add-label-preview">
                    <div className="add-title">Attach a link</div>
                    <input type="text" id="url-upload" placeholder="Enter link url" value={attachSrc} name='webUrlSrc' onChange={e => setAttachSrc(e.target.value)} />
                    {attachSrc &&
                        <>
                            <label htmlFor="url-name-optional"></label>
                            <input
                                type="text"
                                id="url-name-optional"
                                name="webUrlName"
                                value={attachTitle}
                                placeholder="Enter link name"
                                onChange={e => setAttachTitle(e.target.value)}
                            />
                        </>
                    }

                    <button className="attach-btn" onClick={onAttachmentClick}>Attach</button>
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