import React, { useRef, useState, useEffect } from 'react'
import { MdDone } from "react-icons/md";
import { taskService } from '../../services/task.service';




export function AddLabelToBoard({ addLabel }) {
    const [labelName, setLabelName] = useState('')
    const [colorChoose, setColorChoose] = useState('')
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


    useEffect(() => {
    }, [])

    return (
        <div className="add-label-preview">
            <div className="add-title">Name</div>
            <input className='input-name-label' type="text" required="" aria-required="true" value={labelName} onChange={e => setLabelName(e.target.value)}></input>

            <div className="add-title">Select color</div>
            <div className="color-palette">
                {colors.map((color, idx) =>
                    <div key={idx} className="pick-color" style={{ backgroundColor: color }} onClick={() => onChooseColor(color)}>
                        {colorChoose === color && <MdDone style={{ color: 'white' }} className='label-done' />}
                    </div>
                )}
            </div>

            <button className='create-label-btn' onClick={() => addLabel(colorChoose, labelName)}>Create</button>
        </div>

    )
}
